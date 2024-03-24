create table USER (
    ID varchar(20) PRIMARY KEY,
    PASSWORD varchar(20),
    ISADMIN boolean
);

create table LOG (
    ID varchar(20),
    ORDER int PRIMARY KEY,
    FOREIGN KEY (ID) REFERENCES USER(ID)
);

create table LOGINFO (
    ID varchar(20) UNIQUE,
    LOG_COUNT int,
    FOREIGN KEY (ID) REFERENCES USER(ID)
);