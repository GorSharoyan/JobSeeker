import React, { useState, useEffect } from "react";

import "./JobsInfoShow.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  ProfilePicture,
  CoverImage,
} from "../ProfilePictureCover/ProfilePictureCover";
import { useLocation } from "react-router-dom";
import { getJobById } from "../../services/getJobById";
import DetailInfoCompanies from "../DetailInfoCompanies/DetailInfoCompanies";
import MiniCardJobs from "../MiniCardJobs/MiniCardJobs.js";

const useStyles = makeStyles((theme) => ({
  paperCont: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "50px",
    marginRight: "150px",
    marginLeft: "150px",
    padding: "none",
  },
  backButton: {
    position: "absolute",
    top: "100px",
    left: "50px",
  },
  MiniCardJobs: {
    margin: "0 25px",
  },
}));

export default function CompaniesInfoShow() {
  const classes = useStyles();
  const location = useLocation();
  const [job, setJob] = useState(null);

  useEffect(() => {
    getJobById(
      location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
    ).then((res) => {
      console.log("RES",res);
      setJob(res);
    });
  },[]);

if(!job){
  return(
    <h1>Loading</h1>
  )
}else{
  return (
    <div className="AllPageContainer">
      <div className="containerCompaniesMini">
        <div className="mainContainerppp">
          <div className={classes.mainHeader}>
            <div className={classes.paperCont}>
              <ProfilePicture
                imageLink={job.image ? job.image : "No image"}
                className="avatarppp"
                alt="img"
              />
              <CoverImage
                imageLink={job.coverImage ? job.coverImage : "No image"}
              />
            </div>
            <div className="textppp">
              <h1>{job.position ? job.position : "No Job Name"}</h1>
              <p className="descppp">
                {job.bio
                  ? job.bio.description
                    ? job.bio.description
                    : "No Info"
                  : "No Company Description"}
              </p>
            </div>
          </div>
          <hr
            style={{
              color: "#ccc",
              backgroundColor: "#ccc",
              height: 0.5,
              width: "60%",
            }}
          />
          <div className="DetailInfoJobsppp">
            <div>
              {job.contacts ? (
                <DetailInfoCompanies
                  country={
                    job.contacts.country ? job.contacts.country : "No data"
                  }
                  city={job.contacts.city ? job.contacts.city : "No data"}
                  address={
                    job.contacts.address ? job.contacts.address : "No data"
                  }
                  tel={job.contacts.tel ? job.contacts.tel : "No data"}
                  mail={job.contacts.mail ? job.contacts.mail : "No data"}
                  website={
                    job.contacts.website ? job.contacts.website : "No data"
                  }
                />
              ) : (
                "No detail info were given"
              )}
            </div>
            <div className="JobsContainerppp">
              <h2 style={{ marginBlockEnd: "0" }}>Available Jobs:</h2>
              <br />
              <div className="onlyJobsContainerppp">
                <MiniCardJobs
                  image="https://m.economictimes.com/thumb/msid-75241252,width-1200,height-900,resizemode-4,imgsize-94829/hiring-agencies.jpg"
                  jobName="Some name"
                  jobDesc="Be responsible for Support aaaa"
                  className={classes.MiniCardJobs}
                />
                <MiniCardJobs
                  image="https://cdn.lynda.com/static/landing/images/hero/Manager_1200x630-1503438961060.jpg"
                  jobName="Manager"
                  jobDesc="We are hiring for manager. For more info call us"
                  className={classes.MiniCardJobs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}