import React, {useEffect} from "react";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import I18n from "../../components/Element/LanguageSwticher/I18n";
import "./Friends.css";
import {searchUsers, addFriend} from '../../services/userGqlService';


export default function Friends() {

    const [users, updateList] = React.useState([]);
    const [searchField, setSearchField] = React.useState("");
  
  useEffect(() => {
      setSearchField("")
    const getData = async () => {
      let data = await searchUsers("");
      console.log(data);
      updateList(data);
    }
    getData();
  },[users]);


    const updateSearch = async (searchField) => {
        setSearchField(searchField.target.value);
        console.log(searchField.target.value)
        console.log(searchField)
        let data = await searchUsers(searchField)
        updateList(data);
    }

    const addNewFriend = async (friends) => {
        await addFriend(friends);
        let list = await searchUsers(searchField)
        console.log(list)
        updateList(list)
      }


    return (
        <div className="friendsPage">
            <div className="friendsPageTitle">
                <h2 class="font-weight-bold">{I18n.t("friends.lookForFriends")}</h2>
            </div>
            <div className="md-form mt-0 d-flex flex-row">
                <input className="form-control" onChange={updateSearch} type="text" id="Input" placeholder="Search" aria-label="Search" name="searchField"/>
            </div>
            <div className="friend_card_cont">
            {users.map(item => (
                <div className="friend_card">
                <Card key={item.username}>
                    <Card.Body>
                      <Card.Title className="card_text"><h3 class="font-weight-bold">{item.username}</h3></Card.Title>
                      <Card.Subtitle className="card_text"><h5 class="font-weight-bold">{item.email}</h5></Card.Subtitle>
                      <Card.Subtitle className="card_text"><h5 class="font-weight-bold">{I18n.t("friends.from")} {item.address.locality}</h5></Card.Subtitle>
                    </Card.Body>
                    <Card.Body>
                    {item.intrests.map(i => (
                        <Badge key={item.username} pill variant="secondary">{i}</Badge>
                    ))}
                    </Card.Body>
                    <div className="deletefriend_btnContainer">
                        <form>
                        <button
                        type="submit"
                        className="deletefriend_btn"
                        onClick={() => addNewFriend(item.id)}>
                        {I18n.t("friends.addFriend")}
                        </button>
                        </form>
                    </div>
                </Card>
                </div>
            ))}
            </div>
        </div>
    )
}