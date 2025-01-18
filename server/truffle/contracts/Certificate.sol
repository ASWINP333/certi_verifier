// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

contract Certificate {
    address admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, 'Access Denied');
        _;
    }

    struct Cert {
        string course;
        string name;
        string grade;
    }

    mapping(uint256 => Cert) public Certificates;

    function issue(
        uint256 _id,
        string memory _course,
        string memory _name,
        string memory _grade
    ) public onlyAdmin {
        Certificates[_id] = Cert(_course, _name, _grade);
    }
}