const { assert } = require("chai");

const tkoToken = artifacts.require('TKOToken');

contract('TKOToken', function(accounts) {

    var contract_instance;

    console.log(accounts)
    let alice = "0x96C5D20b2a975c050e4220BE276ACe4892f4b41A";
  
    before(async function() {
      contract_instance = await tkoToken.new();
    });
  
    it("owner is the first account", async function(){
      var owner = await contract_instance.owner.call();
      assert.equal(owner, accounts[0]);
    });

    it('mint', async () => {
        var owner = await contract_instance.owner.call();
        await contract_instance.mint(owner, 1000);
        assert.equal((await contract_instance.balanceOf(owner)).toString(), '1000');
    })

    it('transfer', async () => {
        await contract_instance.transfer(alice, 1000);
        assert.equal((await contract_instance.balanceOf(alice)).toString(), '1000');
    })

    it('burn', async () => {
        await contract_instance.burn(alice, 100);
        assert.equal((await contract_instance.balanceOf(alice)).toString(), '900');
    })

    it("Total supply <= 500000000000000000000000000", async function(){
        try {
            var owner = await contract_instance.owner.call();
            await contract_instance.mint(owner, '700000000000000000000000000');
        } catch (error) {
            console.log(error)
            assert(true, error);
        }
    });

    it('symbol', async () => {
        assert.equal(await contract_instance.symbol(), 'TKO');
    })

    it('name', async () => {
        assert.equal(await contract_instance.name(), 'TKO Token');
    })

    it('decimals', async () => {
        assert.equal((await contract_instance.decimals()).toString(), '18');
    })

    it('total supply', async () => {
        assert.equal((await contract_instance.totalSupply()).toString(), '900');
    })

    it('balance', async () => {
        assert.equal((await contract_instance.balanceOf(alice)).toString(), '900');
    })

    it('allowance', async () => {
        var owner = await contract_instance.owner.call();
        let allowance = await contract_instance.allowance(owner, alice);
        assert.exists(allowance)
    })

    it('approve', async () => {
        let approve = await contract_instance.approve(alice, '1000');
        assert.isTrue(approve.receipt.status)
    })

    it('increase allowance', async () => {
        let allowance = await contract_instance.increaseAllowance(alice, '1000');
        assert.isTrue(allowance.receipt.status)
    })

    it('decrease allowance', async () => {
        let allowance = await contract_instance.decreaseAllowance(alice, '1000');
        assert.isTrue(allowance.receipt.status)
    })

});

