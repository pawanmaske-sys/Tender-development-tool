"use client";

import { useMemo, useState } from "react";

const initialData = {
  branches: [
    {
      id: 1,
      name: "Delhi",
      legalEntity: "Satguru Travel Pvt Ltd",
      country: "India",
      currency: "INR",
      status: "Active",
    },
    {
      id: 2,
      name: "Mumbai",
      legalEntity: "Satguru Travel Pvt Ltd",
      country: "India",
      currency: "INR",
      status: "Active",
    },
  ],

  legalEntities: [
    {
      id: 1,
      name: "Satguru Travel Pvt Ltd",
      country: "India",
      currency: "INR",
      status: "Active",
    },
    {
      id: 2,
      name: "Satguru Travel International",
      country: "UAE",
      currency: "AED",
      status: "Active",
    },
  ],

  countries: [
    { id: 1, name: "India", code: "IN", currency: "INR", status: "Active" },
    { id: 2, name: "UAE", code: "AE", currency: "AED", status: "Active" },
    { id: 3, name: "Kenya", code: "KE", currency: "KES", status: "Active" },
  ],

  currencies: [
    { id: 1, code: "INR", name: "Indian Rupee", status: "Active" },
    { id: 2, code: "AED", name: "UAE Dirham", status: "Active" },
    { id: 3, code: "USD", name: "US Dollar", status: "Active" },
    { id: 4, code: "KES", name: "Kenyan Shilling", status: "Active" },
  ],

  services: [
    {
      id: 1,
      name: "Corporate Travel",
      status: "Active",
    },
    {
      id: 2,
      name: "MICE",
      status: "Active",
    },
    {
      id: 3,
      name: "Visa Services",
      status: "Active",
    },
  ],

  tenderSources: [
    {
      id: 1,
      name: "Government eProcurement",
      sourceType: "Government Portal",
      country: "India",
      status: "Active",
    },
    {
      id: 2,
      name: "GeM",
      sourceType: "Government Portal",
      country: "India",
      status: "Active",
    },
    {
      id: 3,
      name: "Client Email",
      sourceType: "Email",
      country: "India",
      status: "Active",
    },
  ],

  tenderTypes: [
    {
      id: 1,
      name: "RFP",
      description: "Request for Proposal",
      status: "Active",
    },
    {
      id: 2,
      name: "RFQ",
      description: "Request for Quotation",
      status: "Active",
    },
    {
      id: 3,
      name: "EOI",
      description: "Expression of Interest",
      status: "Active",
    },
  ],

  tenderStatuses: [
    { id: 1, name: "New", status: "Active" },
    { id: 2, name: "In Process", status: "Active" },
    { id: 3, name: "Submitted", status: "Active" },
    { id: 4, name: "Result Awaited", status: "Active" },
    { id: 5, name: "Won", status: "Active" },
    { id: 6, name: "Lost", status: "Active" },
    { id: 7, name: "On Hold", status: "Active" },
  ],

  lossReasons: [
    {
      id: 1,
      name: "Price",
      status: "Active",
    },
    {
      id: 2,
      name: "Technical Non-Compliance",
      status: "Active",
    },
    {
      id: 3,
      name: "Client Preference",
      status: "Active",
    },
    {
      id: 4,
      name: "Competitor",
      status: "Active",
    },
  ],

  evaluationReasons: [
    {
      id: 1,
      name: "Commercially Not Viable",
      type: "Evaluation",
      status: "Active",
    },
    {
      id: 2,
      name: "Insufficient Information",
      type: "Hold",
      status: "Active",
    },
    {
      id: 3,
      name: "Management Review Required",
      type: "Hold",
      status: "Active",
    },
  ],

  contentCategories: [
    {
      id: 1,
      name: "Company Profile",
      status: "Active",
    },
    {
      id: 2,
      name: "Financial Documents",
      status: "Active",
    },
    {
      id: 3,
      name: "Technical Content",
      status: "Active",
    },
    {
      id: 4,
      name: "Legal Documents",
      status: "Active",
    },
  ],

  templates: [
    {
      id: 1,
      name: "Standard Technical Proposal",
      category: "Technical",
      version: "1.0",
      status: "Active",
    },
    {
      id: 2,
      name: "Commercial Proposal",
      category: "Commercial",
      version: "1.0",
      status: "Active",
    },
  ],
};

const categoryDefinitions = [
  {
    key: "branches",
    title: "Branches",
    description: "Manage branches and their approved legal entity mapping.",
  },
  {
    key: "legalEntities",
    title: "Legal Entities",
    description: "Manage approved legal entities used for tender participation.",
  },
  {
    key: "countries",
    title: "Countries",
    description: "Manage countries used across tender and branch records.",
  },
  {
    key: "currencies",
    title: "Currencies",
    description: "Manage currencies used for tender financial information.",
  },
  {
    key: "services",
    title: "Service Categories",
    description: "Manage service categories used to classify opportunities.",
  },
  {
    key: "tenderSources",
    title: "Tender Sources",
    description: "Manage portals, emails and other tender opportunity sources.",
  },
  {
    key: "tenderTypes",
    title: "Tender Types",
    description: "Manage procurement and tender types.",
  },
  {
    key: "tenderStatuses",
    title: "Status Masters",
    description: "Manage permitted tender lifecycle statuses.",
  },
  {
    key: "evaluationReasons",
    title: "Evaluation / Hold Reasons",
    description: "Manage standard evaluation and hold reasons.",
  },
  {
    key: "lossReasons",
    title: "Loss Reasons",
    description: "Manage standard reasons for unsuccessful outcomes.",
  },
  {
    key: "contentCategories",
    title: "Content Library Categories",
    description: "Manage categories used to organise reusable content.",
  },
  {
    key: "templates",
    title: "Template Master",
    description: "Manage proposal and bid templates.",
  },
];

export default function MastersPage() {
  const [data, setData] = useState(initialData);

  const [selectedCategory, setSelectedCategory] =
    useState("branches");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({});

  const selectedDefinition = categoryDefinitions.find(
    (item) => item.key === selectedCategory
  );

  const filteredItems = useMemo(() => {
    const items = data[selectedCategory] || [];

    if (!search.trim()) {
      return items;
    }

    const term = search.toLowerCase();

    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [data, selectedCategory, search]);

  function openAddModal() {
    setEditingItem(null);

    const defaults = {
      status: "Active",
    };

    if (selectedCategory === "branches") {
      defaults.name = "";
      defaults.legalEntity = "";
      defaults.country = "";
      defaults.currency = "";
    }

    if (selectedCategory === "legalEntities") {
      defaults.name = "";
      defaults.country = "";
      defaults.currency = "";
    }

    if (selectedCategory === "countries") {
      defaults.name = "";
      defaults.code = "";
      defaults.currency = "";
    }

    if (selectedCategory === "currencies") {
      defaults.code = "";
      defaults.name = "";
    }

    if (selectedCategory === "services") {
      defaults.name = "";
    }

    if (selectedCategory === "tenderSources") {
      defaults.name = "";
      defaults.sourceType = "";
      defaults.country = "";
    }

    if (selectedCategory === "tenderTypes") {
      defaults.name = "";
      defaults.description = "";
    }

    if (selectedCategory === "tenderStatuses") {
      defaults.name = "";
    }

    if (selectedCategory === "evaluationReasons") {
      defaults.name = "";
      defaults.type = "Evaluation";
    }

    if (selectedCategory === "lossReasons") {
      defaults.name = "";
    }

    if (selectedCategory === "contentCategories") {
      defaults.name = "";
    }

    if (selectedCategory === "templates") {
      defaults.name = "";
      defaults.category = "";
      defaults.version = "1.0";
    }

    setForm(defaults);
    setShowModal(true);
  }

  function openEditModal(item) {
    setEditingItem(item);
    setForm({ ...item });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingItem(null);
    setForm({});
  }

  function handleFormChange(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function saveItem() {
    if (!form.name && selectedCategory !== "currencies") {
      alert("Please enter a name.");
      return;
    }

    if (
      selectedCategory === "currencies" &&
      !form.code
    ) {
      alert("Please enter currency code.");
      return;
    }

    setData((previous) => {
      const currentItems = previous[selectedCategory];

      if (editingItem) {
        return {
          ...previous,
          [selectedCategory]: currentItems.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  ...form,
                }
              : item
          ),
        };
      }

      return {
        ...previous,
        [selectedCategory]: [
          ...currentItems,
          {
            id: Date.now(),
            ...form,
          },
        ],
      };
    });

    closeModal();
  }

  function toggleStatus(id) {
    setData((previous) => ({
      ...previous,
      [selectedCategory]: previous[selectedCategory].map(
        (item) =>
          item.id === id
            ? {
                ...item,
                status:
                  item.status === "Active"
                    ? "Inactive"
                    : "Active",
              }
            : item
      ),
    }));
  }

  function deleteItem(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this master record?"
    );

    if (!confirmed) return;

    setData((previous) => ({
      ...previous,
      [selectedCategory]: previous[selectedCategory].filter(
        (item) => item.id !== id
      ),
    }));
  }

  function renderFormFields() {
    if (selectedCategory === "branches") {
      return (
        <>
          <Field
            label="Branch Name"
            value={form.name}
            onChange={(value) =>
              handleFormChange("name", value)
            }
          />

          <SelectField
            label="Legal Entity"
            value={form.legalEntity}
            options={data.legalEntities.map(
              (item) => item.name
            )}
            onChange={(value) =>
              handleFormChange("legalEntity", value)
            }
          />

          <SelectField
            label="Country"
            value={form.country}
            options={data.countries.map(
              (item) => item.name
            )}
            onChange={(value) =>
              handleFormChange("country", value)
            }
          />

          <SelectField
            label="Currency"
            value={form.currency}
            options={data.currencies.map(
              (item) => item.code
            )}
            onChange={(value) =>
              handleFormChange("currency", value)
            }
          />
        </>
      );
    }

    if (selectedCategory === "legalEntities") {
      return (
        <>
          <Field
            label="Legal Entity Name"
            value={form.name}
            onChange={(value) =>
              handleFormChange("name", value)
            }
          />

          <SelectField
            label="Country"
            value={form.country}
            options={data.countries.map(
              (item) => item.name
            )}
            onChange={(value) =>
              handleFormChange("country", value)
            }
          />

          <SelectField
            label="Currency"
            value={form.currency}
            options={data.currencies.map(
              (item) => item.code
            )}
            onChange={(value) =>
              handleFormChange("currency", value)
            }
          />
        </>
      );
    }

    if (selectedCategory === "countries") {
      return (
        <>
          <Field
            label="Country Name"
            value={form.name}
            onChange={(value) =>
              handleFormChange("name", value)
            }
          />

          <Field
            label="Country Code"
            value={form.code}
            onChange={(value) =>
              handleFormChange("code", value)
            }
          />

          <SelectField
            label="Currency"
            value={form.currency}
            options={data.currencies.map(
              (item) => item.code
            )}
            onChange={(value) =>
              handleFormChange("currency", value)
            }
          />
        </>
      );
    }

    if (selectedCategory === "currencies") {
      return (
        <>
          <Field
            label="Currency Code"
            value={form.code}
            onChange={(value) =>
              handleFormChange("code", value)
            }
          />

          <Field
            label="Currency Name"
            value={form.name}
            onChange={(value) =>
              handleFormChange("name", value)
            }
          />
        </>
      );
    }

    if (selectedCategory === "services") {
      return (
        <Field
          label="Service Category"
          value={form.name}
          onChange={(value) =>
            handleFormChange("name", value)
          }
        />
      );
    }

    if (selectedCategory === "tenderSources") {
      return (
        <>
          <Field
            label="Source Name"
            value={form.name}
            onChange={(value) =>
              handleFormChange("name", value)
            }
          />

          <Field
            label="Source Type"
            value={form.sourceType}
            onChange={(value) =>
              handleFormChange("sourceType", value)
            }
          />

          <SelectField
            label="Country"
            value={form.country}
            options={data.countries.map(
              (item) => item.name
            )}
            onChange={(value) =>
              handleFormChange("country", value)
            }
          />
        </>
      );
    }

    if (selectedCategory === "tenderTypes") {
      return (
        <>
          <Field
            label="Tender Type"
            value={form.name}
            onChange={(value) =>
              handleFormChange("name", value)
            }
          />

          <Field
            label="Description"
            value={form.description}
            onChange={(value) =>
              handleFormChange("description", value)
            }
          />
        </>
      );
    }

    if (selectedCategory === "tenderStatuses") {
      return (
        <Field
          label="Status Name"
          value={form.name}
          onChange={(value) =>
            handleFormChange("name", value)
          }
        />
      );
    }

    if (selectedCategory === "evaluationReasons") {
      return (
        <>
          <Field
            label="Reason"
            value={form.name}
            onChange={(value) =>
              handleFormChange("name", value)
            }
          />

          <SelectField
            label="Reason Type"
            value={form.type}
            options={[
              "Evaluation",
              "Hold",
            ]}
            onChange={(value) =>
              handleFormChange("type", value)
            }
          />
        </>
      );
    }

    if (selectedCategory === "lossReasons") {
      return (
        <Field
          label="Loss Reason"
          value={form.name}
          onChange={(value) =>
            handleFormChange("name", value)
          }
        />
      );
    }

    if (selectedCategory === "contentCategories") {
      return (
        <Field
          label="Category Name"
          value={form.name}
          onChange={(value) =>
            handleFormChange("name", value)
          }
        />
      );
    }

    if (selectedCategory === "templates") {
      return (
        <>
          <Field
            label="Template Name"
            value={form.name}
            onChange={(value) =>
              handleFormChange("name", value)
            }
          />

          <Field
            label="Category"
            value={form.category}
            onChange={(value) =>
              handleFormChange("category", value)
            }
          />

          <Field
            label="Version"
            value={form.version}
            onChange={(value) =>
              handleFormChange("version", value)
            }
          />
        </>
      );
    }

    return null;
  }

  function renderTable(item) {
    if (selectedCategory === "branches") {
      return (
        <>
          <td>{item.name}</td>
          <td>{item.legalEntity}</td>
          <td>{item.country}</td>
          <td>{item.currency}</td>
        </>
      );
    }

    if (selectedCategory === "legalEntities") {
      return (
        <>
          <td>{item.name}</td>
          <td>{item.country}</td>
          <td>{item.currency}</td>
        </>
      );
    }

    if (selectedCategory === "countries") {
      return (
        <>
          <td>{item.name}</td>
          <td>{item.code}</td>
          <td>{item.currency}</td>
        </>
      );
    }

    if (selectedCategory === "currencies") {
      return (
        <>
          <td>{item.code}</td>
          <td>{item.name}</td>
        </>
      );
    }

    if (selectedCategory === "services") {
      return <td>{item.name}</td>;
    }

    if (selectedCategory === "tenderSources") {
      return (
        <>
          <td>{item.name}</td>
          <td>{item.sourceType}</td>
          <td>{item.country}</td>
        </>
      );
    }

    if (selectedCategory === "tenderTypes") {
      return (
        <>
          <td>{item.name}</td>
          <td>{item.description}</td>
        </>
      );
    }

    if (selectedCategory === "tenderStatuses") {
      return <td>{item.name}</td>;
    }

    if (selectedCategory === "evaluationReasons") {
      return (
        <>
          <td>{item.name}</td>
          <td>{item.type}</td>
        </>
      );
    }

    if (selectedCategory === "lossReasons") {
      return <td>{item.name}</td>;
    }

    if (selectedCategory === "contentCategories") {
      return <td>{item.name}</td>;
    }

    if (selectedCategory === "templates") {
      return (
        <>
          <td>{item.name}</td>
          <td>{item.category}</td>
          <td>{item.version}</td>
        </>
      );
    }

    return null;
  }

  function getColumns() {
    if (selectedCategory === "branches") {
      return [
        "Branch",
        "Legal Entity",
        "Country",
        "Currency",
      ];
    }

    if (selectedCategory === "legalEntities") {
      return [
        "Legal Entity",
        "Country",
        "Currency",
      ];
    }

    if (selectedCategory === "countries") {
      return [
        "Country",
        "Code",
        "Currency",
      ];
    }

    if (selectedCategory === "currencies") {
      return [
        "Code",
        "Currency Name",
      ];
    }

    if (selectedCategory === "services") {
      return ["Service Category"];
    }

    if (selectedCategory === "tenderSources") {
      return [
        "Source",
        "Source Type",
        "Country",
      ];
    }

    if (selectedCategory === "tenderTypes") {
      return [
        "Tender Type",
        "Description",
      ];
    }

    if (selectedCategory === "tenderStatuses") {
      return ["Status"];
    }

    if (selectedCategory === "evaluationReasons") {
      return [
        "Reason",
        "Type",
      ];
    }

    if (selectedCategory === "lossReasons") {
      return ["Loss Reason"];
    }

    if (selectedCategory === "contentCategories") {
      return ["Category"];
    }

    if (selectedCategory === "templates") {
      return [
        "Template",
        "Category",
        "Version",
      ];
    }

    return [];
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

      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "6px",
          }}
        >
          Home / Administration / Masters
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Masters
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage reference data used throughout the
          Tender Management Tool.
        </p>
      </div>

      {/* CATEGORY CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {categoryDefinitions.map((category) => {
          const active =
            selectedCategory === category.key;

          return (
            <button
              key={category.key}
              type="button"
              onClick={() => {
                setSelectedCategory(category.key);
                setSearch("");
              }}
              style={{
                textAlign: "left",
                padding: "16px",
                background: active
                  ? "#eff6ff"
                  : "#ffffff",
                border: active
                  ? "1px solid #2563eb"
                  : "1px solid #e2e8f0",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                {category.title}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                {data[category.key].length} records
              </div>
            </button>
          );
        })}
      </div>

      {/* MANAGEMENT PANEL */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* PANEL HEADER */}

        <div
          style={{
            padding: "20px 24px",
            borderBottom:
              "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "19px",
                color: "#0f172a",
              }}
            >
              {selectedDefinition.title}
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              {selectedDefinition.description}
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            + Add Master
          </button>
        </div>

        {/* SEARCH */}

        <div
          style={{
            padding: "16px 24px",
            borderBottom:
              "1px solid #e2e8f0",
          }}
        >
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder={`Search ${selectedDefinition.title.toLowerCase()}...`}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "11px 13px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
            }}
          />
        </div>

        {/* TABLE */}

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
              minWidth: "850px",
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    "#f8fafc",
                }}
              >
                {getColumns().map(
                  (column) => (
                    <th
                      key={column}
                      style={{
                        padding:
                          "13px 20px",
                        textAlign:
                          "left",
                        fontSize:
                          "12px",
                        color:
                          "#64748b",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      {column}
                    </th>
                  )
                )}

                <th
                  style={{
                    padding:
                      "13px 20px",
                    textAlign:
                      "left",
                    fontSize:
                      "12px",
                    color:
                      "#64748b",
                    borderBottom:
                      "1px solid #e2e8f0",
                  }}
                >
                  Status
                </th>

                <th
                  style={{
                    padding:
                      "13px 20px",
                    textAlign:
                      "center",
                    fontSize:
                      "12px",
                    color:
                      "#64748b",
                    borderBottom:
                      "1px solid #e2e8f0",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      getColumns().length +
                      2
                    }
                    style={{
                      padding:
                        "50px 20px",
                      textAlign:
                        "center",
                      color:
                        "#64748b",
                      fontSize:
                        "13px",
                    }}
                  >
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredItems.map(
                  (item) => (
                    <tr key={item.id}>
                      {renderTable(
                        item
                      )}

                      <td
                        style={{
                          padding:
                            "14px 20px",
                          borderBottom:
                            "1px solid #e2e8f0",
                        }}
                      >
                        <span
                          style={{
                            display:
                              "inline-block",
                            padding:
                              "5px 9px",
                            borderRadius:
                              "999px",
                            background:
                              item.status ===
                              "Active"
                                ? "#dcfce7"
                                : "#fee2e2",
                            color:
                              item.status ===
                              "Active"
                                ? "#166534"
                                : "#b91c1c",
                            fontSize:
                              "11px",
                            fontWeight:
                              "600",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td
                        style={{
                          padding:
                            "14px 20px",
                          borderBottom:
                            "1px solid #e2e8f0",
                          textAlign:
                            "center",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "center",
                            gap: "6px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                item
                              )
                            }
                            style={{
                              padding:
                                "6px 10px",
                              border:
                                "1px solid #cbd5e1",
                              borderRadius:
                                "6px",
                              background:
                                "#ffffff",
                              color:
                                "#334155",
                              fontSize:
                                "11px",
                              cursor:
                                "pointer",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              toggleStatus(
                                item.id
                              )
                            }
                            style={{
                              padding:
                                "6px 10px",
                              border:
                                "1px solid #cbd5e1",
                              borderRadius:
                                "6px",
                              background:
                                "#ffffff",
                              color:
                                "#334155",
                              fontSize:
                                "11px",
                              cursor:
                                "pointer",
                            }}
                          >
                            {item.status ===
                            "Active"
                              ? "Disable"
                              : "Enable"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteItem(
                                item.id
                              )
                            }
                            style={{
                              padding:
                                "6px 10px",
                              border:
                                "1px solid #fecaca",
                              borderRadius:
                                "6px",
                              background:
                                "#fffafa",
                              color:
                                "#dc2626",
                              fontSize:
                                "11px",
                              cursor:
                                "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SYSTEM NOTE */}

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
        Master data is centrally maintained so
        tender records, workflows and reports use
        consistent reference values. Changes to
        master data should be auditable.
      </div>

      {/* MODAL */}

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15, 23, 42, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
              maxHeight: "90vh",
              overflowY: "auto",
              background:
                "#ffffff",
              borderRadius:
                "14px",
              boxShadow:
                "0 20px 50px rgba(15,23,42,.2)",
            }}
          >
            {/* MODAL HEADER */}

            <div
              style={{
                padding:
                  "20px 24px",
                borderBottom:
                  "1px solid #e2e8f0",
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize:
                      "19px",
                    color:
                      "#0f172a",
                  }}
                >
                  {editingItem
                    ? "Edit Master"
                    : "Add Master"}
                </h2>

                <p
                  style={{
                    margin:
                      "5px 0 0",
                    color:
                      "#64748b",
                    fontSize:
                      "12px",
                  }}
                >
                  {selectedDefinition.title}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeModal
                }
                style={{
                  width:
                    "32px",
                  height:
                    "32px",
                  border:
                    "none",
                  borderRadius:
                    "7px",
                  background:
                    "#f1f5f9",
                  color:
                    "#475569",
                  fontSize:
                    "18px",
                  cursor:
                    "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <div
              style={{
                padding:
                  "24px",
                display:
                  "grid",
                gap: "15px",
              }}
            >
              {renderFormFields()}

              <SelectField
                label="Status"
                value={
                  form.status ||
                  "Active"
                }
                options={[
                  "Active",
                  "Inactive",
                ]}
                onChange={(
                  value
                ) =>
                  handleFormChange(
                    "status",
                    value
                  )
                }
              />
            </div>

            {/* FOOTER */}

            <div
              style={{
                padding:
                  "16px 24px",
                borderTop:
                  "1px solid #e2e8f0",
                display:
                  "flex",
                justifyContent:
                  "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={
                  closeModal
                }
                style={{
                  padding:
                    "10px 16px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius:
                    "8px",
                  background:
                    "#ffffff",
                  color:
                    "#334155",
                  fontSize:
                    "13px",
                  cursor:
                    "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  saveItem
                }
                style={{
                  padding:
                    "10px 18px",
                  border:
                    "none",
                  borderRadius:
                    "8px",
                  background:
                    "#2563eb",
                  color:
                    "#ffffff",
                  fontSize:
                    "13px",
                  fontWeight:
                    "600",
                  cursor:
                    "pointer",
                }}
              >
                {editingItem
                  ? "Save Changes"
                  : "Add Master"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* FIELD COMPONENT */

function Field({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        style={{
          display:
            "block",
          marginBottom:
            "6px",
          fontSize:
            "12px",
          fontWeight:
            "600",
          color:
            "#475569",
        }}
      >
        {label}
      </label>

      <input
        value={value || ""}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        style={{
          width:
            "100%",
          boxSizing:
            "border-box",
          padding:
            "10px 12px",
          border:
            "1px solid #cbd5e1",
          borderRadius:
            "8px",
          fontSize:
            "13px",
          color:
            "#334155",
        }}
      />
    </div>
  );
}

/* SELECT COMPONENT */

function SelectField({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div>
      <label
        style={{
          display:
            "block",
          marginBottom:
            "6px",
          fontSize:
            "12px",
          fontWeight:
            "600",
          color:
            "#475569",
        }}
      >
        {label}
      </label>

      <select
        value={value || ""}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        style={{
          width:
            "100%",
          padding:
            "10px 12px",
          border:
            "1px solid #cbd5e1",
          borderRadius:
            "8px",
          background:
            "#ffffff",
          color:
            "#334155",
          fontSize:
            "13px",
        }}
      >
        <option value="">
          Select {label}
        </option>

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}
      </select>
    </div>
  );
}
