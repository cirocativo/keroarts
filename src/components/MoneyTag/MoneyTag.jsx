import "./MoneyTag.scss";
export const MoneyTag = ({ price }) => {
  return <span className="money-tag">+ R$ {price.toFixed(2)}</span>;
};
