import request from "supertest";
import app from "../app";
import {
  sample1,
  sample2,
  sampleOneResult,
  sampleTwoResult,
} from "./samplePayload";

describe("Tests for lannister pay fee routes:", function () {
  it("should compute TPSS transaction fee for sample data 1", async () => {
    const result = await request(app)
      .post("/split-payments/compute")
      .send(sample1);

    expect(result.statusCode).toBe(200);
    expect(result.body).toStrictEqual(sampleOneResult);
  });

  it("should compute TPSS transaction fee for sample data 2", async () => {
    const response = await request(app)
      .post("/split-payments/compute")
      .send(sample2);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(sampleTwoResult);
  });

  it("should not compute transaction fee for invalid payload", async () => {
    const response = await request(app)
      .post("/split-payments/compute")
      .send({});
    expect(response.statusCode).toBe(400);
  });
});
