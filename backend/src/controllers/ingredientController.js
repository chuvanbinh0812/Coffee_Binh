import Ingredient from '../models/Ingredient.js';

export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find().sort('name');
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createIngredient = async (req, res) => {
  try {
    const { name, unit, stockQuantity, minThreshold } = req.body;
    const ingredient = new Ingredient({
      name: name?.trim(),
      unit: unit?.trim(),
      stockQuantity: Number(stockQuantity) || 0,
      minThreshold: Number(minThreshold) || 0
    });
    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const { name, unit, stockQuantity, minThreshold } = req.body;
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      {
        name: name?.trim(),
        unit: unit?.trim(),
        stockQuantity: Number(stockQuantity) || 0,
        minThreshold: Number(minThreshold) || 0
      },
      { new: true, runValidators: true }
    );
    if (!ingredient) return res.status(404).json({ message: 'Ingredient not found' });
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) return res.status(404).json({ message: 'Ingredient not found' });
    res.json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
