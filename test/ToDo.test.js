const ToDoList = artifacts.require("./ToDoList.sol")

contract("ToDoList", (accounts) => {
    before(async () => {
        this.testInstance = await ToDoList.deployed()
    })

    it("contract should deploy successfully", async () => {

        assert.notEqual(this.testInstance, null);
    })

    it("contract should return valid address", async () => {
        const address = await this.testInstance.address

        // reqular expression to check hexadecimal number
        var hex = /[0-9A-Fa-f]{6}/g;
        assert.equal(hex.test(address), true);
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.isString(address);
        hex.lastIndex = 0;
    })

    it("taks[] should return an empty array", async () => {

        const itemCount = await this.testInstance.itemCounter();
        assert.equal(itemCount.toNumber(), 0);
    })

    it("createItem() should reflect in items[]", async () => {

        const createItemResult = await this.testInstance.createItem("0x0000000000000000",
            "0x0000000000000000000000000000000000000000000000000000000000000000");
        const itemCount = await this.testInstance.itemCounter();
        const item = await this.testInstance.items(itemCount - 1);

        assert.equal(item.id.toNumber(), itemCount.toNumber() - 1);
        assert.equal(item.ItemName, "0x0000000000000000");
        assert.equal(item.ItemDetails,
            "0x0000000000000000000000000000000000000000000000000000000000000000");
        assert.equal(item.iscomplete, false);
        assert.equal(itemCount.toNumber(), 1);
    })

    it("createItem() should create a item and return the same values", async () => {

        const createItemResult = await this.testInstance.createItem("0x1000000000000000",
            "0x0000000000000000000000000000000000000000000000000000000000000000");
        const itemCount = await this.testInstance.itemCounter();
        const item = await this.testInstance.items(itemCount - 1);

        assert.equal(item.id.toNumber(), itemCount.toNumber() - 1);
        assert.equal(item.ItemName, "0x1000000000000000");
        assert.equal(item.ItemDetails,
            "0x0000000000000000000000000000000000000000000000000000000000000000");
        assert.equal(item.iscomplete, false);
        assert.equal(itemCount.toNumber(), 2);
    })

    it("createItem() should emit event", async () => {

        const createItemResult = await this.testInstance.createItem("0x2000000000000000",
            "0x0000000000000000000000000000000000000000000000000000000000000000");
        const event = createItemResult.logs[0].args;
        assert.equal(event.id.toNumber(), 2);
        assert.equal(event.itemName, "0x2000000000000000");
        assert.equal(event.itemDetails,
            "0x0000000000000000000000000000000000000000000000000000000000000000");
    })

    it("Mark item as complete", async () => {
        const result = await this.testInstance.markComplete(1);
        const item = await this.testInstance.items(1);
        assert.equal(item.iscomplete, true);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 1);

        // if the item is already true then returns as true
        const markAgain = await this.testInstance.markComplete(1);
        const itemAgain = await this.testInstance.items(1);
        assert.equal(itemAgain.iscomplete, true);
    })
})