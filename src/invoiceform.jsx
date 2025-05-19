import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

export default function InvoiceForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      senderName: "",
      senderEmail: "",
      clientName: "",
      clientEmail: "",
      invoiceNumber: "",
      invoiceDate: "",
      taxRate: 0,
      items: [{ description: "", quantity: 1, price: 0 }],
    },
  });
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//your-social-bar-code.js"; // or popunder code
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = useWatch({ control, name: "items" });
  const taxRate = useWatch({ control, name: "taxRate" });

  const subtotal = items.reduce((acc, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.price) || 0;
    return acc + qty * price;
  }, 0);

  const taxAmount = (subtotal * (parseFloat(taxRate) || 0)) / 100;
  const total = subtotal + taxAmount;

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Invoice Generator
        </h2>

        {/* Sender & Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <input
            {...register("senderName")}
            placeholder="Your Name"
            className="input"
          />
          <input
            {...register("senderEmail")}
            placeholder="Your Email"
            type="email"
            className="input"
          />
          <input
            {...register("clientName")}
            placeholder="Client Name"
            className="input"
          />
          <input
            {...register("clientEmail")}
            placeholder="Client Email"
            type="email"
            className="input"
          />
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <input
            {...register("invoiceNumber")}
            placeholder="Invoice Number"
            className="input"
          />
          <input {...register("invoiceDate")} type="date" className="input" />
          <input
            {...register("taxRate")}
            type="number"
            placeholder="Tax %"
            className="input"
            min={0}
          />
        </div>

        {/* Items Section */}
        <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Items
        </h3>
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 items-center mb-3"
          >
            <input
              {...register(`items.${index}.description`)}
              placeholder="Description"
              className="input col-span-6 md:col-span-7"
            />
            <input
              {...register(`items.${index}.quantity`)}
              type="number"
              placeholder="Qty"
              className="input col-span-2 md:col-span-1 text-center"
              min={1}
            />
            <input
              {...register(`items.${index}.price`)}
              type="number"
              placeholder="Price"
              className="input col-span-2 md:col-span-2 text-center"
              min={0}
              step="0.01"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="col-span-2 md:col-span-2 text-red-600 font-semibold hover:text-red-800 transition"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="text-center mb-8">
          <button
            type="button"
            onClick={() => append({ description: "", quantity: 1, price: 0 })}
            className="inline-block px-6 py-2 text-blue-600 font-semibold rounded hover:bg-blue-100 transition"
          >
            + Add Item
          </button>
        </div>

        {/* Totals Preview */}
        <div className="border-t pt-6 text-center text-gray-800">
          <p className="mb-1">
            Subtotal:{" "}
            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
          </p>
          <p className="mb-1">
            Tax ({taxRate || 0}%):{" "}
            <span className="font-semibold">₹{taxAmount.toFixed(2)}</span>
          </p>
          <p className="text-2xl font-bold mt-3">Total: ₹{total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded text-lg font-semibold hover:bg-blue-700 transition"
        >
          Generate Invoice
        </button>
      </form>
    </div>
  );
}
