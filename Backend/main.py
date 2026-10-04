from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


interactions = [
    {
        "medicine": "warfarin",
        "food": "spinach",
        "severity": "Moderate",
        "message": "Spinach is high in vitamin K. Large or inconsistent changes in vitamin K intake can affect warfarin's effect.",
        "what_happens": "Spinach contains a high amount of vitamin K. Vitamin K can reduce the effect of warfarin, so large or sudden changes in spinach intake may affect how well warfarin works."
    },
    {
        "medicine": "warfarin",
        "food": "kale",
        "severity": "Moderate",
        "message": "Kale is high in vitamin K. Large or inconsistent changes in vitamin K intake can affect warfarin's effect.",
        "what_happens": "Kale is high in vitamin K. Large or sudden changes in kale intake may affect the action of warfarin."
    },
    {
        "medicine": "simvastatin",
        "food": "grapefruit",
        "severity": "High",
        "message": "Grapefruit can increase the amount of simvastatin in the body and may increase the risk of side effects.",
        "what_happens": "Grapefruit can increase the amount of simvastatin in the body. This may increase the risk of side effects from the medicine."
    },
    {
        "medicine": "metronidazole",
        "food": "alcohol",
        "severity": "High",
        "message": "Alcohol should be avoided during treatment with metronidazole because it can cause unpleasant reactions.",
        "what_happens": "Combining alcohol with metronidazole can cause unpleasant reactions. This is why alcohol should be avoided during treatment."
    },
    {
        "medicine": "tetracycline",
        "food": "milk",
        "severity": "Moderate",
        "message": "Calcium in dairy products can reduce absorption of some tetracycline antibiotics.",
        "what_happens": "Calcium in milk can bind with some tetracycline antibiotics and reduce how much of the medicine is absorbed."
    }
]


@app.get("/")
def home():
    return {
        "message": "MediFood Alert API is running!"
    }


@app.get("/medicines")
def get_medicines():
    medicines = sorted(
        list(set(item["medicine"] for item in interactions))
    )

    return medicines


@app.get("/foods")
def get_foods():
    foods = sorted(
        list(set(item["food"] for item in interactions))
    )

    return foods


@app.get("/check")
def check_interaction(medicine: str, food: str):

    medicine = medicine.lower()
    food = food.lower()

    for item in interactions:

        if item["medicine"] == medicine and item["food"] == food:

            return {
            "found": True,
            "medicine": medicine,
            "food": food,
            "severity": item["severity"],
            "message": item["message"],
            "what_happens": item["what_happens"],
            "recommendation": "Consult a healthcare professional before making changes to your medication or diet."
        }

    return {
        "found": False,
        "medicine": medicine,
        "food": food,
        "severity": "None",
        "message": "No known interaction was found in our current database.",
        "recommendation": "This does not guarantee that no interaction exists. Consult a healthcare professional if you have concerns."
    }