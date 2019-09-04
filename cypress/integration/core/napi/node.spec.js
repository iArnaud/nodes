/* global describe it cy beforeEach, expect */

describe('Napi node related functions', function () {
  beforeEach(function () {
    cy.clearState()
    cy.visit('/')
    cy.window().its('napi').as('napi')
    cy.contains('New User')
    cy.getCookie('token').should('exist').then(async token => {
      this.nodeId = token.value.split('-')[0]
    })
  })

  it('napi.getNode can get node', async function () {
    const nodeId = this.nodeId
    const node = await this.napi.getNode(nodeId)
    expect(node.id).to.be.equal(nodeId)
  })

  it('napi.getNodeChildren can get node children', async function () {
    const nodeId = this.nodeId
    const node = await this.napi.getNode(nodeId)
    await this.napi.createNode(null, { parentId: nodeId })
    const nodeChildren = await this.napi.getNodeChildren(node)
    expect(nodeChildren.items.length).to.be.equal(1)
    nodeChildren.items.every(n => expect(n).to.include.keys('id', 'name'))
  })

  it('napi.getNodeChildren can get paginated node children', async function () {
    const nodeId = this.nodeId
    await Promise.all([...Array(5)].map((_, i) => this.napi.createNode(null, { parentId: nodeId, name: `Test Node ${i + 3}` })))
    const node = await this.napi.getNode(nodeId)
    const nodeChildren = await this.napi.getNodeChildren(node, 2)
    expect(nodeChildren.items.length).to.be.equal(2)
    nodeChildren.items.every(n => expect(n).to.include.keys('id', 'name'))
  })

  it('napi.createNode can create node', async function () {
    const nodeId = this.nodeId
    const node = await this.napi.createNode(null, { name: 'New Node', parentId: nodeId, sides: { desktop: true } })
    expect(node.parentId).to.be.equal(nodeId)
  })

  it('napi.updateNode can update node', async function () {
    const nodeId = this.nodeId
    const node = await this.napi.getNode(nodeId)
    const newName = 'Updated Name'
    const updatedNode = await this.napi.updateNode(node.id, [{ op: 'replace', path: '/name', value: newName }])
    expect(updatedNode.name).to.be.equal(newName)
  })

  it('napi.deleteNode can delete node', async function () {
    const nodeId = this.nodeId
    await this.napi.deleteNode(nodeId)
    const errorNode = await this.napi.getNode(nodeId)
    expect(errorNode.status).to.be.equal('error')
  })
})
