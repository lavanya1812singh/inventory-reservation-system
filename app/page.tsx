"use client";

import { useEffect, useState } from "react";

type Inventory = {
  id: string;
  totalQuantity: number;
  reservedQuantity: number;
  warehouse: {
    name: string;
  };
};

type Product = {
  id: string;
  name: string;
  inventories: Inventory[];
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingId, setLoadingId] = useState("");

  async function fetchProducts() {
    const res = await fetch(
      "http://localhost:3000/api/products"
    );

    const data = await res.json();

    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function reserveInventory(
    inventoryId: string
  ) {
    try {
      setLoadingId(inventoryId);

      await fetch(
        "http://localhost:3000/api/reserve",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            inventoryId,
            quantity: 1,
          }),
        }
      );

      await fetchProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  }

 
    return (
  <main
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)",
      color: "white",
      fontFamily: "Arial",
      paddingBottom: "60px",
    }}
  >
    {/* HERO SECTION */}
    <div
      style={{
        padding: "70px 40px 40px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "58px",
          fontWeight: "bold",
          marginBottom: "15px",
          background:
            "linear-gradient(to right, #60a5fa, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:
            "transparent",
        }}
      >
        Inventory Reservation
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          fontSize: "20px",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "32px",
        }}
      >
        Real-time warehouse inventory
        management system with product
        reservation workflows powered by
        Next.js, Prisma and PostgreSQL.
      </p>
    </div>

    {/* PRODUCT SECTION */}
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "20px",
        display: "grid",
        gap: "35px",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            background:
              "rgba(30,41,59,0.8)",
            backdropFilter: "blur(12px)",
            borderRadius: "24px",
            padding: "30px",
            border:
              "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              {product.name}
            </h2>

            <div
              style={{
                background:
                  "#2563eb",
                padding:
                  "10px 18px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {
                product.inventories
                  .length
              }{" "}
              Warehouses
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "25px",
            }}
          >
            {product.inventories.map(
              (inventory) => {
                const available =
                  inventory.totalQuantity -
                  inventory.reservedQuantity;

                return (
                  <div
                    key={inventory.id}
                    style={{
                      background:
                        "#0f172a",
                      borderRadius:
                        "20px",
                      padding: "24px",
                      border:
                        "1px solid #334155",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        marginBottom:
                          "18px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize:
                            "22px",
                          fontWeight:
                            "bold",
                        }}
                      >
                        {
                          inventory
                            .warehouse
                            .name
                        }
                      </h3>

                      <div
                        style={{
                          width: "14px",
                          height:
                            "14px",
                          borderRadius:
                            "50%",
                          background:
                            available >
                            2
                              ? "#22c55e"
                              : available >
                                0
                              ? "#facc15"
                              : "#ef4444",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display:
                          "flex",
                        flexDirection:
                          "column",
                        gap: "10px",
                        color:
                          "#cbd5e1",
                        fontSize:
                          "17px",
                      }}
                    >
                      <p>
                        Total Stock:{" "}
                        {
                          inventory.totalQuantity
                        }
                      </p>

                      <p>
                        Reserved:{" "}
                        {
                          inventory.reservedQuantity
                        }
                      </p>

                      <p
                        style={{
                          color:
                            available >
                            2
                              ? "#22c55e"
                              : available >
                                0
                              ? "#facc15"
                              : "#ef4444",
                          fontWeight:
                            "bold",
                        }}
                      >
                        Available:{" "}
                        {available}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        reserveInventory(
                          inventory.id
                        )
                      }
                      disabled={
                        available <=
                          0 ||
                        loadingId ===
                          inventory.id
                      }
                      style={{
                        width: "100%",
                        marginTop:
                          "24px",
                        padding:
                          "14px",
                        borderRadius:
                          "14px",
                        border: "none",
                        background:
                          "linear-gradient(to right,#2563eb,#3b82f6)",
                        color:
                          "white",
                        fontWeight:
                          "bold",
                        fontSize:
                          "16px",
                        cursor:
                          "pointer",
                        boxShadow:
                          "0 6px 20px rgba(37,99,235,0.4)",
                      }}
                    >
                      {loadingId ===
                      inventory.id
                        ? "Processing..."
                        : available >
                          0
                        ? "Reserve Inventory"
                        : "Out of Stock"}
                    </button>
                  </div>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>

    {/* FOOTER */}
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
        color: "#94a3b8",
        fontSize: "15px",
      }}
    >
      Built with Next.js • Prisma •
      PostgreSQL
    </div>
  </main>
);
}