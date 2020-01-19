class User {
  constructor(
    userId,
    fullName,
    phoneNumber,
    password,
    userType,
    district,
    accountBalance
  ) {
    this.userId = userId;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.userType = userType;
    this.district = district;
    this.accountBalance = accountBalance;
  }
}

export default User;
