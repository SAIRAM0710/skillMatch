import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import acceptWork from '../assets/acceptWork.png';  // Ensure the correct path to your assets
import meetingWork from '../assets/meetingWork.png';
import reqWork from '../assets/reqWork.png';

const WorkerHome = () => {
  const navigate = useNavigate();
  const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
  const { name } = storedUserData || {};

  return (
    <div className="main-content fullContainer">
      <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
        <div className="container-fluid">
          <h2 className="text-center mb-5" style={{ fontWeight: 'bold', color: '#3700B3' }}>Hello, {name}</h2>
          <div className="header-body">
            <div className="row">
              {/* Card 1 - Request */}
              <div className="col-md-6 mb-4">
                <div className="card card-stats mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <span className="h2 font-weight-bold mb-0" style={{ fontWeight: 'bold', color: '#6200EE' }}>Request</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape text-primary shadow">
                          <img src={reqWork} alt="Request" width="60" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <Button variant="warning" onClick={() => navigate("/worker-request")}>
                        View Requests
                      </Button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Check Meeting */}
              <div className="col-md-6">
                <div className="card card-stats mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <span className="h2 font-weight-bold mb-0" style={{ fontWeight: 'bold', color: '#6200EE' }}>Check Meeting</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape text-danger">
                          <img src={meetingWork} alt="Check Meeting" width="60" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <Button variant="warning" >
                        {/* onClick={() => navigate("/worker-meeting")}> */}
                        View Meetings
                      </Button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Current Request */}
              <div className="col-md-6">
                <div className="card card-stats mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <span className="h2 font-weight-bold mb-0" style={{ fontWeight: 'bold', color: '#6200EE' }}>Current Request</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape text-success">
                          <img src={acceptWork} alt="Current Request" width="60" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <Button variant="warning" onClick={() => navigate("/worker-accept")}>
                        View Current Requests
                      </Button>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
