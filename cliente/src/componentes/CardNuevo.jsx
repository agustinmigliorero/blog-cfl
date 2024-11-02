function CardNuevo({ texto, titulo }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-center">{titulo}</h4>
        <p className="card-text">{texto}</p>
      </div>
    </div>
  );
}

export default CardNuevo;
