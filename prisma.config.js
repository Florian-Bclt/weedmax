// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

/** @type {import('prisma').PrismaConfig} */
module.exports = {
  earlyAccess: true,
  schema: path.join(__dirname, "prisma", "schema.prisma"),
};
