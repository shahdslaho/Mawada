import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// إنشاء مكون المفضلة
export const FavoritesContext = createContext();

// دالة لجلب المفضلة من التخزين المحلي
const getFavoritesFromLocalStorage = () => {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

// دالة لتحديث المفضلة في التخزين المحلي
const updateFavoritesInLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// مزود سياق المفضلة
export const FavoritesProvider = ({ children }) => {
  
  const queryClient = useQueryClient();

  // استعلام لجلب بيانات المفضلة
  const { data: favorites, refetch } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavoritesFromLocalStorage,
    initialData: getFavoritesFromLocalStorage(),
  });

  // طلب إضافة لعبة إلى المفضلة
  const addToFavoritesMutation = useMutation({
    mutationFn: (game) => {
      // إضافة اللعبة إلى المفضلة
      const updatedFavorites = [...favorites, game];
      updateFavoritesInLocalStorage(updatedFavorites);
      return updatedFavorites;
    },
    onSuccess: () => {
      // تحديث البيانات بعد النجاح
      queryClient.invalidateQueries(["favorites"]);
      refetch();  
    },
  });

  // طلب إزالة لعبة من المفضلة
  const removeFromFavoritesMutation = useMutation({
    mutationFn: (gameId) => {
      // إزالة اللعبة من المفضلة
      const updatedFavorites = favorites.filter((game) => game.id !== gameId);
      updateFavoritesInLocalStorage(updatedFavorites);
      return updatedFavorites;
    },
    onSuccess: () => {
      // تحديث البيانات بعد النجاح
      queryClient.invalidateQueries(["favorites"]);
      refetch();
    },
  });

  // طلب حذف جميع المفضلة
  const clearFavoritesMutation = useMutation({
    mutationFn: () => {
      // حذف جميع المفضلة
      updateFavoritesInLocalStorage([]);
      return [];
    },
    onSuccess: () => {
      // تحديث البيانات بعد النجاح
      queryClient.invalidateQueries(["favorites"]);
      refetch(); 
    },
  });

  // توفير قيم وطرق المفضلة للمكونات الفرعية
  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites: addToFavoritesMutation.mutate,
        removeFromFavorites: removeFromFavoritesMutation.mutate,
        clearFavorites: clearFavoritesMutation.mutate,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};


export const useFavorites = () => useContext(FavoritesContext);

