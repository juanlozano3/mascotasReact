import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export default function Detail() {
  const { mascotaId } = useParams();
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    const URL =
      "https://gist.githubusercontent.com/josejbocanegra/829a853c6c68880477697acd0490cecc/raw/99c31372b4d419a855e53f0e891246f313a71b20/mascotas.json";

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const foundMascota = data.find((m) => m.id.toString() === mascotaId);
        setMascota(foundMascota);
      })
      .catch((error) => console.error("Error fetching mascota:", error));
  }, [mascotaId]);

  if (!mascota) {
    return <h2 className="text-center mt-4">Cargando...</h2>;
  }

  return (
    <Container className="mt-4 d-flex flex-column align-items-center">
      <Card style={{ width: "30rem" }} className="text-center">
        <Card.Header style={{ backgroundColor: "black", color: "white" }}>
          Adóptame
        </Card.Header>
        <Card.Body>
          <h1>{mascota.nombre}</h1>
          <Card.Img variant="top" src={mascota.foto} alt={mascota.descripcion} />
          <Card.Text className="mt-2">{mascota.raza}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
