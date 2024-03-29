package main

import (
	"net/http"

	"github.com/labstack/gommon/log"

	"github.com/labstack/echo/v4"
)

func getFriends(c echo.Context) error {
	user := getUser(c)

	rows, err := db.Query("SELECT id,username,picture FROM Users JOIN Friends ON Friends.friend=id WHERE Friends.user=?", user)

	if err != nil {
		log.Error(err)
		return echo.ErrInternalServerError
	}

	var Friends []User

	for rows.Next() {
		var channel User
		err := rows.Scan(&channel.Id, &channel.Username, &channel.Picture)

		if err != nil {
			log.Error(err)
			return echo.ErrInternalServerError
		}

		if channel.Id != user {
			Friends = append(Friends, channel)
		}
	}

	if err = rows.Err(); err != nil {
		log.Error(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, Friends)
}

func postFriends(c echo.Context) error {
	body, err := getBody[UsernameBody](c)
	if err != nil {
		log.Error(err)
		return err
	}
	user := getUser(c)

	// get the id of the user
	id, err := getFriendsId(body)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "User Not Found")
	}

	if *id == user {
		return echo.NewHTTPError(http.StatusInternalServerError, "Cannot add yourself as a friend")
	}

	// add the user to the friend list
	_, err = db.Exec("INSERT INTO Friends (user,friend) VALUES (?,?);", user, *id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Friend Already Added")
	}

	return c.NoContent(http.StatusOK)
}

func getFriendsId(body *UsernameBody) (*string, error) {
	row := db.QueryRow("SELECT id FROM Users WHERE username=?;", body.Username)

	var id *string = nil
	err := row.Scan(&id)
	return id, err
}

func getFriend(c echo.Context) error {
	body, err := getBody[UsernameBody](c)
	if err != nil {
		log.Error(err)
		return err
	}

	_, err = getFriendsId(body)
	if err != nil {
		log.Error(err)
		return echo.ErrInternalServerError
	}

	return c.NoContent(http.StatusOK)
}
