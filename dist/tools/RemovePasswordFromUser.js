export function RemovePasswordFromUser(user) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password: pw, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
