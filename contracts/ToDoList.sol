pragma solidity ^0.5.0;

/* 
@author Ayush Kaul
@title ToDoList 
*/
contract ToDoList {
    address public owner;
    uint public itemCounter;    // to store the current item count

    struct Item {
        uint id;
        bytes8 ItemName;    // byte saves memory as compared to string
        bytes32 ItemDetails;
        bool iscomplete;
    }

    // maps integer id to list items
    mapping(uint => Item) public items;

    event ItemCreated(
        uint id,
        bytes8 itemName,
        bytes32 itemDetails
        );

    event ItemCompleted(
        uint id,
        bytes8 itemName,
        bytes32 itemDetails
        );

    constructor() public {
        owner = msg.sender;
        itemCounter = 0;    // initialize the item count to 0, when contract deploys
    }

    // used to restrict the access only to the contract owner
    modifier restricted() {
    if (msg.sender == owner) _;
  }

    /* Creates a new list item.
    @param _itemName the name of the item.
    @param _itemDetails stores the description about the list item
    @dev stores the item in the mapping "items" */
    function createItem (bytes8 _itemName, bytes32 _itemDetails) public {

        items[itemCounter] = Item(itemCounter, _itemName, _itemDetails, false);
        emit ItemCreated(itemCounter, _itemName, _itemDetails);
        itemCounter++;
    }

    /* Creates a new list item.
    @param _id the id assigned to the item.
    @dev stores the item in the mapping "items" */
    function markComplete(uint _id) public {
        Item memory _item = items[_id];

        // check if the item is already complete
        if(_item.iscomplete){
            return;
        } else {
            _item.iscomplete = true;
            items[_id] = _item;
            emit ItemCompleted(_id, _item.ItemName, _item.ItemDetails);
        }
    }
}