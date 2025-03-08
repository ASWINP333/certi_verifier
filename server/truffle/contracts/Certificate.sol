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
        string certificateId;
        string candidateName;
        string certificateName;
        string course;
        string grade;
        string institutionName;
        address issuedBy;
    }

    mapping(string => Cert) public Certificates;

    function issue(
        string memory _certificateUniqueId, 
        string memory _certificateId, 
        string memory _candidateName,
        string memory _certificateName,
        string memory _course,
        string memory _grade,
        string memory _institutionName
    ) public onlyAdmin {
        require(
            bytes(Certificates[_certificateUniqueId].candidateName).length == 0,
            "Certificate ID already exists"
        );

        Certificates[_certificateUniqueId] = Cert(
            _certificateId, 
            _candidateName,
            _certificateName,
            _course,
            _grade,
            _institutionName,
            msg.sender
        );
    }

    function getCertificate(string memory _certificateUniqueId)
        public
        view
        returns (
            string memory certificateId,
            string memory candidateName,
            string memory certificateName,
            string memory course,
            string memory grade,
            string memory institutionName,
            address issuedBy
        )
    {
        Cert memory cert = Certificates[_certificateUniqueId];

        return (
            cert.certificateId,
            cert.candidateName,
            cert.certificateName,
            cert.course,
            cert.grade,
            cert.institutionName,
            cert.issuedBy
        );
    }
}
