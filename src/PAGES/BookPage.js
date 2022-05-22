import React from "react";
import { Paper, Typography, Grid, TextField, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "./Pages.css";
import Popover from "@mui/material/Popover";
import axios from "axios";
import { AccountContext } from "./AccountProvider";
import { render } from "react-dom";

export default function BookPage() {
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

  const { UID, Name, Mail, Password, setUID, setName, setEmail, setPassword } =
      useContext(AccountContext);

      console.log(UID,Name,Mail)




  function Borrowedbooks(props) {

    const {
        index,
        _id,
        btitle,
        bauthors,
        bedition,
        bpublisher,
        blanguage,
        bISBN,
        bdate,
        breturndate,
    }= props; 

    console.log(index)

    const  onClick = () =>{
      axios
      .delete(`http://localhost:5000/DeleteBorrow/?ID=${borrow[index]._id}`)
      .then(resp => {
        resp.send(resp)
      })


    }

    return(
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
                  {btitle}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {"Authors: " + bauthors}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {"Edition : " + bedition + "\n"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {"Publisher: " + bpublisher + "\n"}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {"Language : " + blanguage + "\n"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"ISBN :" + bISBN}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  {"Borrow date " + bdate.substring(0,10)}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  {"Return date " + breturndate.substring(0,10)}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="p" onClick={onClick}>
                  Return Book
                </Button>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
    )

  }


  function BookDisplay(props) {
    const {
      index,
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

    let borrowdate = new Date();
    borrowdate = Date.now()
    let returndate = new Date();
    returndate.setDate(returndate.getDate() + 5);

    let borrowdata = {
      user: UID,
      book: _id,
      borrowedDate: borrowdate,
      returned: returndate,
    };

    const Borrow = () => {
      if (bookCount > 0) {
        axios.post("http://localhost:5000/CreateBorrow", borrowdata)
        .then(resp =>{
          console.log(resp)
        })
        .catch(e =>{
          console.log(e)
        })
        
        axios.put(`http://localhost:5000/UpdateBook/?id=${_id}`, {
          numberofbook: bookCount - 1,
        });
      }
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
                  <Button variant="p" onClick={Borrow}>
                    Borrow book
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
  const [borrow,setBorrow] = useState([]);
  const [brwbook,setBrwbook] =useState([]);

  useEffect(() => {
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

  useEffect(()=>  {
    fetch(`http://localhost:5000/getBorrowById/?ID=${UID}`)
    .then((resp) =>{
      return resp.json();
    })
    .then((borrow) =>{
      setBorrow(borrow);
      //console.log(borrow[0].book);
      
    })
    .catch(e =>{
      alert(e);
    })

    console.log(borrow);
    var i;
   
    for( i = 0; i<borrow.length;i++){
    axios
    .get(`http://localhost:5000/getBooksById/?ID=${borrow[i].book}`)
    .then(resp=>{
      setBrwbook(brwbook => [...brwbook, resp.data])
      console.log(resp.data)
    });

    }
    console.log(brwbook)
  },[])

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

  const getBorrowedBooks = () =>{

    setBrwbook([]);

    fetch(`http://localhost:5000/getBorrowById/?ID=${UID}`)
    .then((resp) =>{
      return resp.json();
    })
    .then((borrow) =>{
      setBorrow(borrow);
      //console.log(borrow[0].book);
      
    })
    .catch(e =>{
      alert(e);
    })

    console.log(borrow);
    var i;
   
    for( i = 0; i<borrow.length;i++){
    axios
    .get(`http://localhost:5000/getBooksById/?ID=${borrow[i].book}`)
    .then(resp=>{
      setBrwbook(brwbook => [...brwbook, resp.data])
      console.log(resp.data)
    });

    }
    console.log(brwbook)
  }

  useEffect(() => {
    console.log(UID, Name, Mail);
  }, [UID]);

  const Refresh = () =>{
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
  }



  return (
    <>
      <div className="book-page">
        <h1>
          Welcome ,  {Name}
        </h1>

        <div className="add-book">
          <h2>Here you can add books to our online library!</h2>
          <h4>If book already exist, it just updates the number of books </h4>
          <div className="add-book-row">
            {" "}
            <TextField
              id="addtitle"
              variant="filled"
              onChange={(e) => {
                setaddTitle(e.target.value);
              }}
            />{" "}
            <h3> Title </h3>
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

         <Button variant="outlined" color="inherit" onClick={Refresh}>Refresh Book info </Button>
        <div className="data-display">
          {data &&
            data.map((info, key) => (
              <BookDisplay
                index={key}
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
              Update in the Library{" "}
            </Button>
          </div>
        </div>
        <div >
          <div className="borrow-button-display">
          <Button  variant="outlined" color="inherit" onClick={getBorrowedBooks}>Display Borrowed Books</Button>
          </div>
        <div className="data-display">
          
        {
            brwbook.map((info, index) => 
              <Borrowedbooks
                index={index}
                _id={info._id}
                btitle={info.title}
                bauthors={info.authors}
                bedition={info.edition}
                bpublisher={info.publisher}
                blanguage={info.language}
                bISBN={info.ISBN}
                bdate={borrow[index].borrowedDate}
                breturndate={borrow[index].returned}
              />        
            
            )}  
            
        </div>
        </div>
      </div>
    </>
  );
}
