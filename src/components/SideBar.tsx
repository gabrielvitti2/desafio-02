import { useEffect, useState } from "react";

import { Button } from "./Button";

import {GenreResponseProps} from '../types/interfaces'

import {api} from '../services/api'


interface SidebarProps {
  setSelectedGenreId (arg: number): void,
  selectedGenreId: number

}

export function SideBar(props: SidebarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  function handleClickButton(id: number) {
    props.setSelectedGenreId(id);
  }

  return (

    <nav className="sidebar">

        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={props.selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}