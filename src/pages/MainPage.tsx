import { fetchCards } from "../store/cardsSlice";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../store/store";
import Card from "../components/Card";
import { useEffect } from "react";
import { ICard } from "../utils/types";
import Filter from "../components/Filter";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { filtered } = useSelector((state: RootState) => state.cards);

  useEffect(() => {
    if (filtered.length === 0) dispatch(fetchCards());
  }, [dispatch]);

  const renderCards = (arr: ICard[]) => {
    return arr.map((card) => {
      return (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          id={card.id}
        />
      );
    });
  };

  const content = renderCards(filtered);

  return (
    <section className="main">
      <Filter />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "15px",
        }}>
        {content}
      </div>
    </section>
  );
}
