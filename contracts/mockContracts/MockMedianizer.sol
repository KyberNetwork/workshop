pragma solidity 0.4.18;


contract MockMedianizer {

    bool has = true;
    uint val;

    function MockMedianizer(uint _val) public {
        val = _val;
    }

    function peek() public view returns (bytes32, bool) {
        return(bytes32(val), has);
    }
}
