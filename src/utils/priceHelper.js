import { PLANNERS, PRODUCTS } from "../data/products";
import { PRODUCT_PRICES } from "../data/prices";

export const getPrice = ({ productId, size, sheetCount, plannerId }) => {
  if (productId === "planner") {
    return PRODUCT_PRICES.planner?.[plannerId]?.[size]?.[sheetCount];
  }

  return PRODUCT_PRICES[productId]?.[size]?.[sheetCount];
};

export function getPriceRange(productId) {
  const prices = [];

  function collectPrices(value) {
    if (typeof value === "number") {
      prices.push(value);
      return;
    }

    if (value && typeof value === "object") {
      Object.values(value).forEach(collectPrices);
    }
  }

  collectPrices(PRODUCT_PRICES[productId]);

  if (!prices.length) {
    return [0, 0];
  }

  return [Math.min(...prices), Math.max(...prices)];
}

export const calculateTotal = (order) => {
  if (!order.product) return 0;

  const productId = order.product.id;
  let basePrice = 0;

  // 1. LÓGICA PARA PLANNER (Possui uma camada extra: plannerType)
  if (
    productId === "planner" &&
    order.plannerType &&
    order.size &&
    order.sheetCount
  ) {
    const plannerId = order.plannerType.id; // assumindo que tenha .id no objeto do selector
    basePrice =
      PRODUCT_PRICES.planner?.[plannerId]?.[order.size]?.[order.sheetCount] ||
      0;
  }

  // 2. LÓGICA PARA OS DEMAIS PRODUTOS (Notebook, Ring Binder, Notepad, etc.)
  else if (order.size && order.sheetCount) {
    const productData =
      PRODUCT_PRICES[productId]?.[order.size]?.[order.sheetCount];

    // Checa se o preço final ainda depende do tipo de miolo (blank / lined)
    if (typeof productData === "object" && productData !== null) {
      // Caso você adicione a opção de miolo no estado do seu app no futuro (ex: order.paperType)
      // Por enquanto, vou definir um padrão (ex: 'blank') ou pegar o primeiro valor encontrado
      const paperType = order.paperType || "blank";
      basePrice = productData[paperType] || 0;
    } else {
      basePrice = productData || 0;
    }
  }

  // 3. ADICIONA OS EXTRAS (Igual você queria, somando no final)
  if (order.foilActivated) {
    basePrice += PRODUCT_PRICES.extra.foil;
  }

  return basePrice;
};

const getMinSheetCountForSize = (product, size) => {
  if (!product?.sheetCount) return null;

  if (Array.isArray(product.sheetCount)) {
    return Math.min(...product.sheetCount);
  }

  const counts = product.sheetCount[size];
  return counts ? Math.min(...counts) : null;
};

export const normalizePrice = (price) => {
  if (typeof price === "number") return price;
  if (price && typeof price === "object") {
    const values = Object.values(price).filter((v) => typeof v === "number");
    return values.length ? Math.min(...values) : 0;
  }
  return 0;
};

const normalizePriceZeroAsNull = (price) => {
  const normalized = normalizePrice(price);
  return normalized === 0 ? null : normalized;
};

export const getPriceLabel = (product, size) => {
  const sheetCount = getMinSheetCountForSize(product, size);
  if (!sheetCount) return "";
  const price = normalizePriceZeroAsNull(
    getPrice({ productId: product.id, size, sheetCount }),
  );
  return price != null ? `R$ ${price}` : "";
};

export const getPlannerPriceLabel = (plannerId) => {
  const planner = PLANNERS.find((p) => p.id === plannerId);
  console.log(
    "Calculando preço para plannerId:",
    plannerId,
    "Encontrado planner:",
    planner,
  );
  if (!planner) return "";
  const price = normalizePriceZeroAsNull(
    getPrice({
      productId: "planner",
      plannerId,
      size: "A5",
      sheetCount: getMinSheetCountForSize(planner, "A5"),
    }),
  );
  return price != null ? `R$ ${price}` : "";
};
