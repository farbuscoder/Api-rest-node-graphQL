import Palette from "../models/palettes.js";

// AGREGAR NUEVO Palette

export const addPalette = async (req, res, next) => {
  const newPalette = new Palette({ ...req.body });
  try {
    const savedPalette = await newPalette.save();
    res.status(200).json(savedPalette);
  } catch (error) {
    res.status(404).json("El palette no fue agregado");
    next(error);
  }
};

// CONSEGUIR UNA PALETTE POR ID

export const getPaletteById = async (req, res, next) => {
  try {
    const palette = await Palette.findById(req.params.id);

    res.status(200).json(palette);
  } catch (error) {
    next(error);
  }
};

// CONSEGUIR TODOS LOS PRODUCTOS

export const getPalettes = async (req, res, next) => {
  try {
    const palettes = await Palette.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json(palettes);
  } catch (error) {
    console.log(error);
  }
};

//MODIFICAR PALETTE
export const modifyPalette = async (req, res, next) => {
  try {
    const palette = await Palette.findById(req.params.id);

    if (palette) {
      await Palette.findByIdAndUpdate(
        req.params.id,

        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "La palette fue modificado exitosamente",
      });
    } else {
      return res.status(404).json({ error: "La palette no fue hallado" });
    }
  } catch (error) {
    console.log(error);
  }
};

//ELIMINAR PALETTE
export const deletePalette = async (req, res, next) => {
  try {
    const palette = await Palette.findById(req.params.id);

    if (palette) {
      await Palette.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "El Palette fue eliminado exitosamente",
      });
    } else {
      return res.status(404).json({ error: "El palette no fue hallado" });
    }
  } catch (error) {
    console.log(error);
  }
};
