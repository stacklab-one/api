import { hash } from "bun";

const rawValue = "changeme";

console.log("Raw: ", rawValue);
const hashedValue = await Bun.password.hash(rawValue, "bcrypt");
console.log("Hashed value: ", hashedValue);
console.log(
    "Hashed value again: ",
    await Bun.password.hash(rawValue, "bcrypt"),
);
console.log(
    "Compare Hash with plain: ",
    await Bun.password.verify(rawValue, hashedValue),
);
