export type TMayBe<T> = T | null | undefined;

export type TPlayer = {
  id?: TMayBe<string>;
  name?: TMayBe<string>;
  description?: TMayBe<string>;
  type?: TMayBe<"batsman" | "bowler" | "allRounder" | "wicketKeeper">;
  points?: TMayBe<number>;
  rank?: TMayBe<number>;
  dob?: TMayBe<number>;
  avatar?: string;
};
