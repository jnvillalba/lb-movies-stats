import RepeatedActors from "../Components/RepeatedActors";
import movies from "../Lists/movies";
import Vol1 from "../Lists/Vol1";
import Vol10 from "../Lists/Vol10";
import Vol2 from "../Lists/Vol2";
import Vol3 from "../Lists/Vol3";
import Vol4 from "../Lists/Vol4";
import Vol5 from "../Lists/Vol5";
import Vol6 from "../Lists/Vol6";
import Vol8 from "../Lists/Vol8";
import Vol9 from "../Lists/Vol9";

const allVolumes = [Vol10, Vol9, Vol8, movies, Vol6, Vol5, Vol4, Vol3, Vol2, Vol1];
const todas = allVolumes.flatMap((volume) => volume);

// Actors duplicated within the SAME movie (data integrity check)
const dataErrors = todas.reduce((acc, movie) => {
  if (!movie.actors) return acc;

  const counts = {};
  const duplicates = [];

  movie.actors.forEach((actor) => {
    counts[actor] = (counts[actor] || 0) + 1;
    if (counts[actor] === 2) {
      duplicates.push(actor);
    }
  });

  if (duplicates.length > 0) {
    acc.push({ movieName: movie.name, year: movie.year, duplicates });
  }

  return acc;
}, []);

export default function RepeatedActorsPage() {
  return <RepeatedActors data={dataErrors} />;
}
