// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

contract Certificate {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Access Denied");
        _;
    }

    struct Cert {
        string candidateName;
        string certificateName;
        string course;
        string grade;
        string institutionName;
        address issuedBy;
    }

    mapping(uint256 => Cert) public Certificates;

    function issue(
        uint256 _id,
        string memory _candidateName,
        string memory _certificateName,
        string memory _course,
        string memory _grade,
        string memory _institutionName
    ) public onlyAdmin {
        Certificates[_id] = Cert(
            _candidateName,
            _certificateName,
            _course,
            _grade,
            _institutionName,
            msg.sender
        );
    }

    function getCertificate(uint256 _id)
        public
        view
        returns (
            string memory candidateName,
            string memory certificateName,
            string memory course,
            string memory grade,
            string memory institutionName,
            address issuedBy
        )
    {
        Cert memory cert = Certificates[_id];

        return (
            cert.candidateName,
            cert.certificateName,
            cert.course,
            cert.grade,
            cert.institutionName,
            cert.issuedBy
        );
    }
}
