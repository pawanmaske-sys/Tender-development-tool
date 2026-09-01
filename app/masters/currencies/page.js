"use client";

import { useMemo, useState } from "react";

const initialCurrencies = [
  {
    id: "CUR-0001",
    name: "Indian Rupee",
    code: "INR",
    symbol: "₹",
    country: "India",
    decimals: 2,
    status: "Active",
  },
  {
    id: "CUR-0002",
    name: "US Dollar",
    code: "USD",
    symbol: "$",
    country: "United States",
    decimals: 2,
    status: "Active",
  },
  {
    id: "CUR-0003",
    name: "Euro",
    code: "EUR",
    symbol: "€",
    country: "European Union",
    decimals: 2,
    status: "Active",
  },
  {
    id: "CUR-0004",
    name: "British Pound",
    code: "GBP",
    symbol: "£",
    country: "United Kingdom",
    decimals: 2,
    status: "Active",
  },
];

export default function CurrenciesPage() {
  const [currencies, setCurrencies] = useState(initialCurrencies);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    symbol: "",
    country: "",
    decimals: "2",
  });

  const filteredCurrencies = useMemo(() => {
    return currencies.filter((currency) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        !searchText ||
        currency.id.toLowerCase().includes(searchText) ||
        currency.name.toLowerCase().includes(searchText) ||
        currency.code.toLowerCase().includes(searchText) ||
        currency.symbol.toLowerCase().includes(searchText) ||
        currency.country.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        currency.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [currencies, search, statusFilter]);

  const activeCount = currencies.filter(
    (currency) => currency.status === "Active"
  ).length;

  const inactiveCount = currencies.filter(
    (currency) => currency.status === "Inactive"
  ).length;

  function handleSave() {
    if (!form.name || !form.code || !form.symbol) {
      alert("Please complete all required fields.");
      return;
    }

    const newCurrency = {
      id: `CUR-${String(currencies.length + 1).padStart(4, "0")}`,
      name: form.name,
      code: form.code.toUpperCase(),
      symbol: form.symbol,
      country: form.country,
      decimals: Number(form.decimals),
      status: "Active",
    };

    setCurrencies((current) => [
      ...current,
      newCurrency,
    ]);

    setForm({
      name: "",
      code: "",
      symbol: "",
      country: "",
      decimals: "2",
    });

    setShowModal(false);
  }

  function toggleStatus(id) {
    setCurrencies((current) =>
      current.map((currency) =>
        currency.id === id
          ? {
              ...currency,
              status:
                currency.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : currency
      )
    );
  }

  function deleteCurrency(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this currency?"
    );

    if (!confirmed) return;

    setCurrencies((current) =>
      current.filter((currency) => currency.id !== id)
    );
  }

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              color: "#64748b",
              marginBottom: "6px",
            }}
          >
            Home / Administration / Master Management / Currencies
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Currency Master
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage currencies used for tender values and financial information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{
            padding: "11px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + Add Currency
        </button>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Total Currencies", currencies.length],
          ["Active Currencies", activeCount],
          ["Inactive Currencies", inactiveCount],
        ].map(([title, value]) => (
          <div
            key={title}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              {title}
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "27px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "14px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Search
            </label>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by currency name, code, symbol, country..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#ffffff",
                fontSize: "13px",
              }}
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>All Statuses</option>
            </select>
          </div>
        </div>
      </div>

      {/* CURRENCY REGISTER */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              color: "#0f172a",
            }}
          >
            Currency Register
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Maintain standard currencies used across tender and financial
            workflows.
          </p>
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "0.8fr 1.5fr 0.7fr 0.7fr 1.4fr 0.8fr 0.8fr 1.1fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Currency ID</div>
          <div>Currency Name</div>
          <div>Code</div>
          <div>Symbol</div>
          <div>Country / Region</div>
          <div>Decimals</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filteredCurrencies.length === 0 ? (
          <div
            style={{
              padding: "45px 24px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            No currencies found.
          </div>
        ) : (
          filteredCurrencies.map((currency) => (
            <div
              key={currency.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "0.8fr 1.5fr 0.7fr 0.7fr 1.4fr 0.8fr 0.8fr 1.1fr",
                gap: "12px",
                padding: "17px 24px",
                borderBottom: "1px solid #e2e8f0",
                alignItems: "center",
                fontSize: "13px",
                color: "#334155",
              }}
            >
              <div
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                }}
              >
                {currency.id}
              </div>

              <div
                style={{
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {currency.name}
              </div>

              <div
                style={{
                  fontWeight: "600",
                }}
              >
                {currency.code}
              </div>

              <div
                style={{
                  fontSize: "17px",
                }}
              >
                {currency.symbol}
              </div>

              <div>{currency.country || "—"}</div>

              <div>{currency.decimals}</div>

              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background:
                      currency.status === "Active"
                        ? "#dcfce7"
                        : "#f1f5f9",
                    color:
                      currency.status === "Active"
                        ? "#15803d"
                        : "#64748b",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  {currency.status}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    toggleStatus(currency.id)
                  }
                  style={{
                    padding: "5px 8px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  {currency.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteCurrency(currency.id)
                  }
                  style={{
                    padding: "5px 8px",
                    border: "1px solid #fecaca",
                    borderRadius: "6px",
                    background: "#fffafa",
                    color: "#dc2626",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* INFORMATION NOTE */}
      <div
        style={{
          marginTop: "20px",
          padding: "16px 20px",
          borderRadius: "10px",
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e40af",
          fontSize: "13px",
          lineHeight: "1.5",
        }}
      >
        Currency master data should be maintained centrally so tender values,
        commercial information and reports use consistent currency codes
        and symbols.
      </div>

      {/* ADD CURRENCY MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
              background: "#ffffff",
              borderRadius: "14px",
              boxShadow:
                "0 20px 50px rgba(15,23,42,0.25)",
              overflow: "hidden",
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "19px",
                  color: "#0f172a",
                }}
              >
                Add Currency
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                ×
              </button>
            </div>

            {/* MODAL BODY */}
            <div style={{ padding: "24px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                {/* NAME */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    Currency Name *
                  </label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Indian Rupee"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </div>

                {/* CODE */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    Currency Code *
                  </label>

                  <input
                    value={form.code}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        code: e.target.value,
                      })
                    }
                    placeholder="e.g. INR"
                    maxLength={3}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                      textTransform: "uppercase",
                    }}
                  />
                </div>

                {/* SYMBOL */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    Symbol *
                  </label>

                  <input
                    value={form.symbol}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        symbol: e.target.value,
                      })
                    }
                    placeholder="e.g. ₹"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </div>

                {/* COUNTRY */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    Country / Region
                  </label>

                  <input
                    value={form.country}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        country: e.target.value,
                      })
                    }
                    placeholder="e.g. India"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>

              {/* DECIMALS */}
              <div style={{ marginTop: "14px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Decimal Places
                </label>

                <select
                  value={form.decimals}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      decimals: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#ffffff",
                    fontSize: "13px",
                  }}
                >
                  <option value="0">0</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: "9px 16px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "7px",
                  background: "#ffffff",
                  color: "#334155",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                style={{
                  padding: "9px 16px",
                  border: "none",
                  borderRadius: "7px",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Save Currency
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
