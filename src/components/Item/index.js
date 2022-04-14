import "./index.css";

const Item = (props) => {
  const { itemDetails, onClickDelete } = props;
  const { id, avatar, firstName, lastName, email } = itemDetails;

  const onClickDeleteButton = () => {
    onClickDelete(id);
  };

  return (
    <li className="item-container">
      <div className="item-details">
        <img src={avatar} className="image" alt="avatar" />
        <p className="name">
          {firstName} {lastName}
        </p>
        <p className="email">{email}</p>
        <button type="button" className="button" onClick={onClickDeleteButton}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Item;
