// zxcvbn ships no types for its matcher module; this covers the part the password policy uses.
declare module "zxcvbn/lib/matching" {
  type Match = { pattern: string; dictionary_name?: string; i: number; j: number };
  const matching: { omnimatch(password: string): Match[] };
  export default matching;
}
