import Button from "@/components/General/Button";
import Input from "@/components/General/Input";
import React from "react";
import Form from "next/form";

export default function AdminProductFilter() {
  return (
    <Form action="/admin/products" className="flex gap-4">
      <Input
        divStyle="border p-2  bg-dark-btn"
        inputProps={{ type: "text", name: "name", className: "bg-dark-btn",placeholder:"search by name" }}
      ></Input>
      <select name="isAvailableSale" className="border p-2 bg-dark-btn">
        <option value="">All</option>
        <option value="true">Available</option>
        <option value="false">Unavailable</option>
      </select>
      <Button style="primary" size="large" type="submit">
        Search
      </Button>
    </Form>
  );
}
