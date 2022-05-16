import { Paper, Typography, Grid, TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./Pages.css";
import { AccountContext } from "../DATA/Accountdata";

function BookPage(props) {
  const {
    ID,
    Name,
    Email,
    Password,
    setID,
    setName,
    setEmail,
    setPassword,
  } = useContext(AccountContext);

  const [title, setaddTitle] = useState();
  const [authors, setaddAuthors] = useState();
  const [editors, setaddEditors] = useState();
  const [ISBN, setaddISBN] = useState();
  const [publishYear, setaddPublishYear] = useState();
  const [edition, setaddEdition] = useState();
  const [publisher, setaddPublisher] = useState();
  const [pageCount, setaddPageCount] = useState();
  const [language, setaddLanguage] = useState();
  const [numberofbook, setaddNumberofbook] = useState(0);
  const [id, setid] = useState();

  const [updatetitle, setupdatetitle] = useState("");
  const [updateauthors, setupdateauthors] = useState("");
  const [updateeditors, setupdateeditors] = useState("");
  const [updateISBN, setupdateISBN] = useState("");
  const [updatepublishYear, setupdatepublishYear] = useState("");
  const [updateedition, setupdateedition] = useState("");
  const [updatepublisher, setupdatepublisher] = useState("");
  const [updatepageCount, setupdatepageCount] = useState("");
  const [updatelanguage, setupdatelanguage] = useState("");
  const [updatenumberofbook, setupdatenumberofbook] = useState("");

  function BookDisplay(props) {
    const {
      ptitle,
      pauthors,
      peditors,
      ppublishYear,
      pedition,
      ppublisher,
      planguage,
      ppageCount,
      pISBN,
      pbookCount,
      _id,
    } = props;
    /* 
        const [title,setTitle] = useState(" ");
        const [authors,setAuthors]=useState(" ");
        const [editors,setEditors]=useState(" ");    
        const [publishYear,setPublishYear]=useState(" ");
        const [edition,setEdition]=useState(" ");
        const [publisher,setPublisher]=useState(" ");
        const [language,setLanguage]=useState(" ");
        const [pageCount,setPageCount]=useState(" ");
        const [ISBN,setISBN]=useState(" ");
       */
    const [bookCount, setBookCount] = useState(pbookCount);

    const onClick = () => {
      setid(_id);
      setupdatetitle(ptitle);
      setupdateauthors(pauthors);
      setupdateeditors(peditors);
      setupdateISBN(pISBN);
      setupdatepublishYear(ppublishYear);
      setupdateedition(pedition);
      setupdatepublisher(ppublisher);
      setupdatepageCount(ppageCount);
      setupdatelanguage(planguage);
      setupdatenumberofbook(pbookCount);
    };

    const Delete = () => {
      fetch(`http://localhost:5000/DeleteBook?id=${_id}`, { method: "delete" })
        .then((resp) => {
          alert(resp, "done");
        })
        .catch((e) => {
          alert(e);
        });
    };

    return (
      <>
        <Paper
          sx={{
            p: 2,
            margin: "10px",
            maxWidth: 400,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="div">
                    {ptitle}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"Authors: " + pauthors}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"Editors: " + peditors + " \n"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"Published at :" +
                      String(ppublishYear).substring(0, 10) +
                      "\n"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"Edition : " + pedition + "\n"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"Publisher: " + ppublisher + "\n"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"Language : " + planguage + "\n"}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"Pages : " + ppageCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {"ISBN :" + pISBN}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    {"Count : " + bookCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="p" onClick={onClick}>
                    Choose Book
                  </Button>
                  <Button variant="p" onClick={Delete}>
                    Delete Book Entry
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(Name);
    fetch("http://localhost:5000/getBooks")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const AddBook = () => {
    console.log(
      title,
      authors,
      editors,
      ISBN,
      publishYear,
      edition,
      publisher,
      pageCount,
      language
    );

    let res = fetch("http://localhost:5000/Addbook", {
      method: "post",
      body: JSON.stringify({
        title,
        authors,
        editors,
        ISBN,
        publishYear,
        edition,
        publisher,
        pageCount,
        language,
        numberofbook,
      }),
      headers: { "Content-type": "application/json" },
    }).then((resp) => alert(resp.status, "book added"));
  };

  const UpdateBook = () => {
    fetch(`http://localhost:5000/UpdateBook/?id=${id}`, {
      method: "put",
      body: JSON.stringify({
        title: updatetitle,
        authors: updateauthors,
        editors: updateeditors,
        ISBN: updateISBN,
        publishYear: updatepublishYear,
        edition: updateedition,
        publisher: updatepublisher,
        pageCount: updatepageCount,
        language: updatelanguage,
        numberofbook: updatenumberofbook,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((resp) => {
        console.log(resp.status);
        if (resp.status == 404) {
          console.log(resp);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="book-page">
        <h1>Welcome , {Name} </h1>

        <div className="add-book">
          <h2>Here you can add books to our online library!</h2>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addtitle"
              variant="filled"
              onChange={(e) => {
                setaddTitle(e.target.value);
              }}
            />{" "}
            <h3> Title</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addauthors"
              variant="filled"
              onChange={(e) => {
                setaddAuthors(e.target.value);
              }}
            />{" "}
            <h3> Authors</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addeditors"
              variant="filled"
              onChange={(e) => {
                setaddEditors(e.target.value);
              }}
            />{" "}
            <h3> Editors</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addISBN"
              variant="filled"
              onChange={(e) => {
                setaddISBN(e.target.value);
              }}
            />{" "}
            <h3> ISBN</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addpublishYear"
              variant="filled"
              type="date"
              onChange={(e) => {
                setaddPublishYear(e.target.value);
              }}
            />{" "}
            <h3> Publish Year</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addedition"
              variant="filled"
              onChange={(e) => {
                setaddEdition(e.target.value);
              }}
            />{" "}
            <h3> Edition</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addpublisher"
              variant="filled"
              onChange={(e) => {
                setaddPublisher(e.target.value);
              }}
            />{" "}
            <h3> Publisher</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addpageCount"
              variant="filled"
              onChange={(e) => {
                setaddPageCount(e.target.value);
              }}
            />{" "}
            <h3> Page Count</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addlanguage"
              variant="filled"
              onChange={(e) => {
                setaddLanguage(e.target.value);
              }}
            />{" "}
            <h3> Language</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addnumberofbook"
              variant="filled"
              onChange={(e) => {
                setaddNumberofbook(Number(e.target.value));
              }}
            />{" "}
            <h3> Number of book</h3>
          </div>

          <div className="add-book-row">
            {" "}
            <Button variant="outlined" color="inherit" onClick={AddBook}>
              Add to the Library{" "}
            </Button>
          </div>
        </div>

        <div className="data-display">
          {data &&
            data.map((info) => (
              <BookDisplay
                key={info.key}
                _id={info._id}
                ptitle={info.title}
                pauthors={info.authors}
                peditors={info.editors}
                pISBN={info.ISBN}
                ppublishYear={info.publishYear}
                pedition={info.edition}
                ppublisher={info.publisher}
                ppageCount={info.pageCount}
                planguage={info.language}
                pbookCount={info.numberofbook}
              />
            ))}
        </div>

        <div className="add-book">
          <h2>Here you can Update books in our online library!</h2>
          <div className="add-book-row">
            {" "}
            <TextField
              value={updatetitle}
              id="updatetitle"
              variant="filled"
              onChange={(e) => {
                setupdatetitle(e.target.value);
              }}
            />{" "}
            <h3> Title</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              value={updateauthors}
              id="updateauthors"
              variant="filled"
              onChange={(e) => {
                setupdateauthors(e.target.value);
              }}
            />{" "}
            <h3> Authors</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              value={updateeditors}
              id="updateeditors"
              variant="filled"
              onChange={(e) => {
                setupdateeditors(e.target.value);
              }}
            />{" "}
            <h3> Editors</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              value={updateISBN}
              id="updateISBN"
              variant="filled"
              onChange={(e) => {
                setupdateISBN(e.target.value);
              }}
            />{" "}
            <h3> ISBN</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              value={String(updatepublishYear).substring(0, 10)}
              id="updatepublishYear"
              variant="filled"
              type="date"
              onChange={(e) => {
                setupdatepublishYear(e.target.value);
              }}
            />{" "}
            <h3> Publish Year</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              value={updateedition}
              id="updateedition"
              variant="filled"
              onChange={(e) => {
                setupdateedition(e.target.value);
              }}
            />{" "}
            <h3> Edition</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              value={updatepublisher}
              id="updatepublisher"
              variant="filled"
              onChange={(e) => {
                setupdatepublisher(e.target.value);
              }}
            />{" "}
            <h3> Publisher</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              value={updatepageCount}
              id="updatepageCount"
              variant="filled"
              onChange={(e) => {
                setupdatepageCount(e.target.value);
              }}
            />{" "}
            <h3> Page Count</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              value={updatelanguage}
              id="updatelanguage"
              variant="filled"
              onChange={(e) => {
                setupdatelanguage(e.target.value);
              }}
            />{" "}
            <h3> Language</h3>
          </div>
          <div className="add-book-row">
            {" "}
            <TextField
              value={updatenumberofbook}
              id="updatenumberofbook"
              variant="filled"
              onChange={(e) => {
                setupdatenumberofbook(Number(e.target.value));
              }}
            />{" "}
            <h3> Number of book</h3>
          </div>

          <div className="add-book-row">
            {" "}
            <Button variant="outlined" color="inherit" onClick={UpdateBook}>
              Add to the Library{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookPage;
