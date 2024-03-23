export default (req: any, res: any) => {
  throw new Error("API throw error test");
  res.status(200).json({ name: "John Doe" });
};
