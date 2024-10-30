const MovieSearchForm = ({ onSearch }) => {
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;
    if (form.elements.topic.value.trim() === "") {
      return alert("Please enter search term!");
    }
    onSearch(topic);
    form.reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="topic" placeholder="Enter movie name..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default MovieSearchForm;
