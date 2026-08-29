"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type FavoriteItem = {
  slug: string;
  title: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (slug: string) => boolean;
  favoritesCount: number;
};

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<
    FavoriteItem[]
  >([]);

  function toggleFavorite(
    item: FavoriteItem
  ) {
    setFavorites((current) => {
      const exists = current.some(
        (favorite) =>
          favorite.slug === item.slug
      );

      if (exists) {
        return current.filter(
          (favorite) =>
            favorite.slug !== item.slug
        );
      }

      return [
        ...current,
        item,
      ];
    });
  }

  function isFavorite(
    slug: string
  ) {
    return favorites.some(
      (favorite) =>
        favorite.slug === slug
    );
  }

  const favoritesCount =
    useMemo(
      () => favorites.length,
      [favorites]
    );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context =
    useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites doit être utilisé dans FavoritesProvider"
    );
  }

  return context;
}