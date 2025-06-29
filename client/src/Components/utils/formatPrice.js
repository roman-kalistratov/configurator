export function formatPrice(price) {
  if (typeof price !== 'number') return price;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
