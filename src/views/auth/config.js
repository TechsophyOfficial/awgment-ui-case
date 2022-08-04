export default {
    "logo_url": "/static/images/logo.png",
    "logo_title": "Agent Dashboard",
    "headings": {
        "conversation": {
            "buyer": "Service Requester/Buyer",
            "seller": "Service Provider/Seller"
        },
        "comments": {
            "main": "Comments"
        },
        "form": {
            "main": "Form"
        },
        "quoteSummary": {
            "main": "Quote Summary"
        }
    },

    "tasklist_sorting_options": {
        "single": [
            { "id": "created", "historicId": "startTime", "label": "Created" },
            { "id": "priority", "label": "Priority" },
            { "id": "dueDate", "label": "Due Date" },
            { "id": "followUpDate", "label": "Follow Up Date" },
            { "id": "name", "historicId": "taskName", "label": "Task Name" },
            { "id": "assignee", "label": "Assignee" },
        ],
        "variable": [
            { "id": "processVariable", "label": "Process Variable" },
            { "id": "executionVariable", "label": "Execution Variable" },
            { "id": "taskVariable", "label": "Task Variable" },
            { "id": "caseExecutionVariable", "label": "Case Execution Variable" },
            { "id": "caseInstanceVariable", "label": "Case Instance Variable" },
        ]
    },


    "enabled_case_variables": {
        "CCOCaseModel": {
            "variables": [
                { "name": "assigneToUser", "title": "Assignee" }
            ]
        },
        "GenericCase": {
            "variables": [
                { "name": "buyerName", "title": "Buyer Name" },
                { "name": "productId", "title": "Product" },
                { "name": "requestId", "title": "Request Id" },
                { "name": "quantity", "title": "Quantity" }
            ]
        },
        "GenericProcessIntegrationCaseModel": {
            "variables": [
                { "name": "buyerName", "title": "Buyer Name" },
                { "name": "productId", "title": "Product" },
                { "name": "quantity", "title": "Quantity" },
                { "name": "estimatedprice", "title": "Price" },
            ]
        }

    },

    "transaction_summary_list": {
        "GenericAgentTask": [
            {
                "component": "TxnDetails",
                "details": {
                    "label": "RFQ Details",
                    "icon": "description",
                    "variables": [
                        { "name": "rfqId", "title": "RFQ Id" },
                        { "name": "buyerName", "title": "Buyer Name" },
                        { "name": "productID", "title": "Product Id" },
                        { "name": "quantity", "title": "Quantity" },
                        { "name": "estimatedprice", "title": "Price" },
                        { "name": "deliveryAddress", "title": "Delivery Address" }
                    ]
                }
            },
            // {
            //     "component": "TxnDetails",
            //     "details": {
            //         "label": "RFQ Details",
            //         "icon": "description",
            //         "variables": [
            //             { "name": "rfqId", "title": "RFQ Id" },
            //             { "name": "buyerName", "title": "Buyer Name" },
            //             { "name": "productID", "title": "Product Id" },
            //             { "name": "quantity", "title": "Quantity" },
            //             { "name": "estimatedprice", "title": "Price" },
            //             { "name": "deliveryAddress", "title": "Delivery Address" }
            //         ]
            //     }
            // },
            {
                "component": "TxnState",
                "details": {
                    "label": "Transaction State",
                    "icon": "mouse",
                    "steps": [
                        { "id": "rfq", "name": "RFQ Stage", "icon": "library_books", "color": "#FF5A84" },
                        { "id": "quote", "name": "Quote", "icon": "description", "color": "#9439FF" },
                        { "id": "negotiation", "name": "Negotiation", "icon": "speaker_notes", "color": "#5CCC9C" },
                        { "id": "order", "name": "Order Stage", "icon": "local_mall", "color": "#DFBE00" }
                    ]
                }
            },
            // {
            //     "component": "TxnState",
            //     "details": {
            //         "label": "Transaction State",
            //         "icon": "mouse",
            //         "steps": [
            //             { "id": "rfq", "name": "RFQ Stage", "icon": "library_books", "color": "#FF5A84" },
            //             { "id": "quote", "name": "Quote", "icon": "description", "color": "#9439FF" },
            //             { "id": "negotiation", "name": "Negotiation", "icon": "speaker_notes", "color": "#5CCC9C" },
            //             { "id": "order", "name": "Order Stage", "icon": "local_mall", "color": "#DFBE00" }
            //         ]
            //     }
            // },
            // {
            //     "component": "TxnState",
            //     "details": {
            //         "label": "Transaction State",
            //         "icon": "mouse",
            //         "steps": [
            //             { "id": "rfq", "name": "RFQ Stage", "icon": "library_books", "color": "#FF5A84" },
            //             { "id": "quote", "name": "Quote", "icon": "description", "color": "#9439FF" },
            //             { "id": "negotiation", "name": "Negotiation", "icon": "speaker_notes", "color": "#5CCC9C" },
            //             { "id": "order", "name": "Order Stage", "icon": "local_mall", "color": "#DFBE00" }
            //         ]
            //     }
            // }
        ]
    },

    "transaction_summary": {
        "GenericAgentTask": {
            "transaction_details": {
                "label": "RFQ Details",
                "icon": "description",
                "variables": [
                    { "name": "rfqId", "title": "RFQ Id" },
                    { "name": "buyerName", "title": "Buyer Name" },
                    { "name": "productID", "title": "Product Id" },
                    { "name": "quantity", "title": "Quantity" },
                    { "name": "estimatedprice", "title": "Price" },
                    { "name": "deliveryAddress", "title": "Delivery Address" }
                ]
            },
            "transaction_state": {
                "label": "Transaction State",
                "icon": "mouse",
                "steps": [
                    { "id": "rfq", "name": "RFQ Stage", "icon": "library_books", "color": "#FF5A84" },
                    { "id": "quote", "name": "Quote", "icon": "description", "color": "#9439FF" },
                    { "id": "negotiation", "name": "Negotiation", "icon": "speaker_notes", "color": "#5CCC9C" },
                    { "id": "order", "name": "Order Stage", "icon": "local_mall", "color": "#DFBE00" }
                ]
            }
        }
    },
    "form_component": {
        "PlanItem_1": {
            "component": 'TaskForm'
        },
        "GenericAgentTask" : {
            "component": 'TaskForm'
        },
        "PlanItem_1pgwwc8": {
            "component": 'ContactProducerForm'
        },
    },

    "task_widget": {

    },

    "search_parameters": [
        { "variable": "caseInstanceId", "title": "ID", 'categoryLabel': 'Case Instance' },
        { "variable": "caseInstanceBusinessKey", "title": "Business Key", 'categoryLabel': 'Case Instance' },
        { "variable": "caseInstanceBusinessKeyLike", "title": "Business Key Like", 'categoryLabel': 'Case Instance' },

        { "variable": "caseDefinitionId", "title": "ID", 'categoryLabel': 'Case Definition' },
        { "variable": "caseDefinitionKey", "title": "Key", 'categoryLabel': 'Case Definition' },
        { "variable": "caseDefinitionName", "title": "Name", 'categoryLabel': 'Case Definition' },
        { "variable": "caseDefinitionNameLike", "title": "Name Like", 'categoryLabel': 'Case Definition' },

        { "variable": "assignee", "title": "Assignee", 'categoryLabel': 'User/Group' },
        { "variable": "assigneeIn", "title": "Assignee In", 'categoryLabel': 'User/Group' },
        { "variable": "assigneeLike", "title": "Assignee Like", 'categoryLabel': 'User/Group' },
        { "variable": "owner", "title": "Owner", 'categoryLabel': 'User/Group' },
        { "variable": "candidateGroup", "title": "Candidate Group", 'categoryLabel': 'User/Group' },
        { "variable": "withCandidateGroups", "title": "Candidate Groups", 'categoryLabel': 'User/Group' },
        { "variable": "candidateUser", "title": "Candidate User", 'categoryLabel': 'User/Group' },
        { "variable": "involvedUser", "title": "Involved User", 'categoryLabel': 'User/Group' },
        { "variable": "unassigned", "title": "Unassigned", 'categoryLabel': 'User/Group', "defaultValue": "true" },

        { "variable": "name", "title": "Name", 'categoryLabel': 'Task' },
        { "variable": "nameLike", "title": "Name Like", 'categoryLabel': 'Task' },

        { "variable": "buyerName", "title": "Buyer Name", "category": 'caseInstanceVariables', 'categoryLabel': 'Case Variables' },
        { "variable": "productId", "title": "Product Id", "category": 'caseInstanceVariables', 'categoryLabel': 'Case Variables' }
    ],

    "journey_templates": {
        "buyer1": [
            {
                "id": "quote_from_seller",
                "name": "Quote from seller",
                "icon": "description",
                "journeyName": "quoteForBuyer",
                "successMsg" : "Quote from seller sent successfully",
                "negotiationIteration" : false,
                "variables": [
                    {
                        "id": "productName",
                        "label": "Product",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "quantity",
                        "label": "Quantity",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "brand",
                        "label": "Brand",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "categoryName",
                        "label": "Category Name",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "estimatedprice",
                        "label": "Price",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "sellerQuotedPrice",
                        "label": "Seller Quote Price",
                        "type": "text"
                    }
                ]
            },
            {
                "id": "rfq_from_buyer",
                "name": "Negotiation from Seller",
                "icon": "person",
                "journeyName": "quoteForBuyer",
                "successMsg" : "Negotiation from Seller sent successfully",
                "negotiationIteration" : true,
                "variables": [

                    {
                        "id": "productName",
                        "label": "Product",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "quantity",
                        "label": "Quantity",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "brand",
                        "label": "Brand",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "categoryName",
                        "label": "Category Name",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "estimatedprice",
                        "label": "Price",
                        "type": "text",
                        "readOnly": "true"
                    },
                   
                    {
                        "id": "sellerNegotiatedPrice",
                        "label": "Seller Negotiate Price",
                        "type": "text"
                    }
                ]
            },
            {
                "id": "proforma_invoice",
                "name": "Proforma Invoice",
                "icon": "description",
                "journeyName": "proformaInvoice",
                "successMsg" : "Proforma Invoice sent successfully",
                "variables": [
                    {
                        "id": "invoiceUrl",
                        "label": "Invoice URL",
                        "defaultValue": "https://cdn.vertex42.com/ExcelTemplates/Images/proforma-invoice.gif",
                        "type": "text",
                        "readOnly": "true"
                    }
                ]
            },
            // {
            //     "id": "rfq_to_seller",
            //     "name": "RFQ to Seller",
            //     "icon": "person",
            //     "journeyName": "",
            //     "successMsg" : "RFQ to Seller sent successfully",
            //     "variables": []
            // },
            // {
            //     "id": "sending_document",
            //     "name": "Sending a Document",
            //     "icon": "forward",
            //     "journeyName": "",
            //     "successMsg" : "Document sent successfully",
            //     "variables": []
            // },
            // {
            //     "id": "req_order_confirm",
            //     "name": "Request / Order Confirmation",
            //     "icon": "assignment_turned_in",
            //     "journeyName": "",
            //     "successMsg" : "Request / Order Confirmation sent successfully",
            //     "variables": []
            // },
            // {
            //     "id": "gen_message",
            //     "name": "General Message",
            //     "icon": "mail",
            //     "journeyName": "",
            //     "successMsg" : "Message sent successfully",
            //     "variables": []
            // }
        ],
        "seller1": [
            {
                "id": "quote_from_seller",
                "name": "Quote from Buyer",
                "icon": "description",
                "journeyName": "quoteForSeller",
                "successMsg" : "Quote from seller sent successfully",
                "negotiationIteration": true,
                "variables": [
                    
                    {
                        "id": "productName",
                        "label": "Product",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "quantity",
                        "label": "Quantity",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "brand",
                        "label": "Brand",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "estimatedprice",
                        "label": "Price",
                        "type": "text",
                    },
                    {
                        "id": "buyerNegotiatedPrice",
                        "label": "Buyer Quote Price",
                        "type": "text"
                    }
                    
                ]
            },
            {
                "id": "rfq_from_buyer",
                "name": "RFQ from Buyer",
                "icon": "person",
                "journeyName": "quoteForSeller",
                "successMsg" : "RFQ from Buyer sent successfully",
                "negotiationIteration": false,
                "variables": [
                    
                    {
                        "id": "productName",
                        "label": "Product",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "productName",
                        "label": "Product",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "quantity",
                        "label": "Quantity",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "brand",
                        "label": "Brand",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "categoryName",
                        "label": "Category Name",
                        "type": "text",
                        "readOnly": "true"
                    },
                    {
                        "id": "estimatedprice",
                        "label": "Price",
                        "type": "text",
                        "readOnly": "true"
                      
                    }
                ]
            },


          

            {
                "id": "seller_invoice",
                "name": "Seller Invoice",
                "icon": "upload",
                "journeyName": "sellerInvoice",
                "successMsg" : "Seller Invoice sent successfully",
                "variables": [
                    // {
                    //     // "id": "invoiceUrl",
                    //     // "label": "Invoice URL",
                    //     // "defaultValue": "https://cdn.vertex42.com/ExcelTemplates/Images/proforma-invoice.gif",
                    //     // "type": "text",
                    //     // "readOnly": "true",
                    //     // "display":"none",
                    // }
                ]
            },
        ]
    }
}