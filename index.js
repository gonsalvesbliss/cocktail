import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

// Route to fetch cocktail
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    const drink = response.data.drinks[0];

    res.render("index", {
  name: drink.strDrink,
  instructions: drink.strInstructions,
  image: drink.strDrinkThumb,
  category: drink.strCategory,
  glass: drink.strGlass,
  ingredient1: drink.strIngredient1,
  ingredient2: drink.strIngredient2,
  ingredient3: drink.strIngredient3
});

  } catch (error) {
    res.send("Error fetching cocktail data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});