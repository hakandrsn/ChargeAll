import React, { useEffect, useState } from 'react'
import Modal from "../../modal/Modal"
import history from '../../history'
import ax from '../../ax'
import "./Users.css"
import PdfButton from '../shared/PdfButton'
import TotalLabel from '../shared/TotalLabel'
import SortBtn from '../shared/SortBtn'
import Loading from "../../utils/Loading"
import date from "date-and-time"
const UsersDetail = (props) => {
  const { id } = props.match.params
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [sorted, setSorted] = useState("amount")
  const [search, setSearch] = useState("")
  const replaceDate = (op) => {
    return (new Date(op.date).getFullYear() + "-" + new Date(op.date).getMonth() + "-" + new Date(op.date).getDate()).toLowerCase().toString()
  }
  const headersCharge = [
    {
      id: "deviceid",
      numeric: false,
      disablePadding: false,
      label: "Cihaz İd",
      isFiltering: true,
    },
    {
      id: "energy",
      numeric: false,
      disablePadding: false,
      label: "Enerji",
      isFiltering: true,
    },
    {
      id: "amount",
      numeric: false,
      disablePadding: false,
      label: "Miktar",
      isFiltering: true,
    },
    {
      id: "duration",
      numeric: false,
      disablePadding: false,
      label: "Süre",
      isFiltering: true,
    },
    {
      id: "date",
      numeric: false,
      disablePadding: false,
      label: "Tarih",
      isFiltering: true,
    },

  ];
  const headersFills = [
    {
      id: "userid",
      numeric: false,
      disablePadding: false,
      label: "Kullanıcı id",
      isFiltering: true,
    },
    {
      id: "amount",
      numeric: false,
      disablePadding: false,
      label: "Miktar",
      isFiltering: true,
    },
    {
      id: "lastbalance",
      numeric: false,
      disablePadding: false,
      label: "Son bakiye",
      isFiltering: true,
    },
    {
      id: "admin",
      numeric: false,
      disablePadding: false,
      label: "yetkili",
      isFiltering: true,
    },
    {
      id: "date",
      numeric: false,
      disablePadding: false,
      label: "Tarih",
      isFiltering: true,
    },

  ];

  useEffect(() => {
    setLoading(true)
    const getingUser = async () => {
      await ax.get(`/users/${id}`).then(res => {
        setUser(res.data) 
      }).catch(err => {
        setError(err)
        console.log(error)
      }).finally(() => setLoading(false))
    }
    getingUser()
  }, [id, error])
  const filteredDevice = (srt = "date", data) => {
    const sortedData =data && data.sort((a, b) => {
      if (a[srt] < b[srt]) return 1
      if (a[srt] > b[srt]) return -1
      return 0
    })
    if (search === "") return sortedData
    return sortedData.filter((dat) => {
      return ((dat.deviceid && dat.deviceid.toString().toLowerCase().includes(search))) ||
        (dat.amount && dat.amount.toFixed(2).toString().toLowerCase().includes(search)) ||
        (dat.energy && dat.energy.toFixed(2).toString().toLowerCase().includes(search)) ||
        (dat.date && dat.date.toString().toLowerCase().includes(search)) ||
        (dat.admin && dat.admin.toString().toLowerCase().includes(search))
    })
  }

  const filteredFills = (srt = "date", data) => {
    const sortedData =data && data.sort((a, b) => {
      if (a[srt] < b[srt]) return 1
      if (a[srt] > b[srt]) return -1
      return 0
    })
    if (search === "") return sortedData
    return sortedData.filter((dat) => {
      return ((dat.userid && dat.userid.toString().toLowerCase().includes(search))) ||
        (dat.amount && dat.amount.toFixed(2).toString().toLowerCase().includes(search)) ||
        (dat.lastbalance && dat.lastbalance.toFixed(2).toString().toLowerCase().includes(search)) ||
        (dat.date && dat.date.toString().toLowerCase().includes(search)) ||
        (dat.duration && dat.duration.toFixed(2).toString().toLowerCase().includes(search))
    })
  }
  const deleteUser = async (user) => {
    if (window.confirm("Silmek istediğinize emin misiniz ?")) {
      await ax.delete(`/users/${user._id}`).then(res => {
        history.push("/users")
        console.log(res)
      }).catch(err => { alert(err) })
    }
  }

  const renderContent = () => {
    return (
      <div className='w-100'>
        {/* silme butonu */}
        <button
          onClick={() => deleteUser(user)}
          className='position-absolute px-3 rounded'
          style={{ top: 15, left: 15, color: "white", backgroundColor: "red", border: "none" }}>
          Sil
        </button>

        <div className='d-flex flex-column align-items-center w-100'>
          <ul className="nav nav-tabs border-0 mb-2" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link nav-nav active" id="devices-tab" data-bs-toggle="tab" data-bs-target="#devices" type="button" role="tab" aria-controls="devices" aria-selected="true">İzinli Cihazlar</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link nav-nav" id="operations-tab" data-bs-toggle="tab" data-bs-target="#operations" type="button" role="tab" aria-controls="operations" aria-selected="false">Şarj İşlemleri</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link nav-nav" id="fills-tab" data-bs-toggle="tab" data-bs-target="#fills" type="button" role="tab" aria-controls="fills" aria-selected="false">Bakiye Yüklemeleri</button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button className="nav-link nav-nav" id="states-tab" data-bs-toggle="tab" data-bs-target="#states" type="button" role="tab" aria-controls="states" aria-selected="false">Contact</button>
            </li> */}
          </ul>
          <div className="tab-content w-100" id="myTabContent">
            <div className="tab-pane fade show active" id="devices" role="tabpanel" aria-labelledby="devices-tab">
              <label className='mb-2 ms-2'>Şarj İzni verilen Cihaz Listesi</label>
              <ol className='list-group list-group-numbered '>
                {user.devices && user.devices.map((device, i) => {
                  return (
                    <li className='list-group-item' key={i}>
                      <label className='fs-6'> {device} </label>
                    </li>
                  )
                })}
              </ol>
            </div>
            <div className="tab-pane fade" id="operations" role="tabpanel" aria-labelledby="operations-tab">
              <div className='d-flex'>
                <div className="input-group mb-3">
                  <input onChange={(e) => setSearch(e.target.value.toLowerCase())} type="text" className="form-control" placeholder="Operasyonlarda Ara" aria-label="Recipient's username" aria-describedby="button-addon2" />
                  <button className="btn btn-outline-secondary" type="button" id="button-addon2">Ara</button>
                </div>
                <PdfButton header={headersCharge} data={filteredDevice(sorted, user.operations)} title="Şarj İşlemleri" />
              </div>
              <div className='d-flex justify-content-evenly mb-2'>
              <TotalLabel title="Toplam Enerji" data={user.operations} value="energy" />
              <TotalLabel title="Toplam Ödeme" data={user.operations} value="amount" />
              <TotalLabel title="Toplam Süre" data={user.operations} value="duration" />
              </div>
              <div className='table-responsive'>
                <table className='table borderless'>
                  <thead className='table-dark'>
                    <tr>
                      <th>#</th>
                      <th><SortBtn title="Cihaz id" state={()=>setSorted("deviceid")} /></th>
                      <th><SortBtn title="Enerji" state={()=>setSorted("energy")} /></th>
                      <th><SortBtn title="Tutar" state={()=>setSorted("amount")} /></th>
                      <th><SortBtn title="Süre" state={()=>setSorted("duration")} /></th>
                      <th><SortBtn title="Tarih" state={()=>setSorted("date")} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      user.operations && filteredDevice(sorted, user.operations).map((op, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{op.deviceid}</td>
                            <td>{op.energy.toFixed(2)}</td>
                            <td>{op.amount.toFixed(2)}</td>
                            <td>{op.duration.toFixed(2)}</td>
                            <td>{op.date}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>


            <div className="tab-pane fade show" id="fills" role="tabpanel" aria-labelledby="devices-tab">
              <div className='d-flex '>
                <div className="input-group mb-3">
                  <input onChange={(e) => setSearch(e.target.value.toLowerCase())} type="text" className="form-control" placeholder="Bakiyelerde Ara" aria-label="Recipient's username" aria-describedby="button-addon3" />
                  <button className="btn btn-outline-secondary" type="button" id="button-addon3">Ara</button>
                </div>
                <PdfButton header={headersFills} data={filteredFills(sorted, user.fills)} title="Bakiye Yüklemeleri" />
              </div>
              <div className='d-flex justify-content-evenly mb-2'>
              <TotalLabel title="Toplam Ödeme" data={user.fills} value="amount" />
              <TotalLabel title="Toplam Son Bakiye" data={user.fills} value="lastbalance" />
              </div>
              <table className='table borderless'>
                <thead className='table-dark'>
                  <tr>
                    <th>#</th>
                    <th><SortBtn title="Kullanıcı id" state={()=>setSorted("userid")} /></th>
                      <th><SortBtn title="Tutar" state={()=>setSorted("amount")} /></th>
                      <th><SortBtn title="Son Yükleme" state={()=>setSorted("lastbalance")} /></th>
                      <th><SortBtn title="Yetki" state={()=>setSorted("admin")} /></th>
                      <th><SortBtn title="Tarih" state={()=>setSorted("date")} /></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    user.fills && filteredFills(sorted, user.fills).map((op, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{op.userid}</td>
                          <td>{op.amount}</td>
                          <td>{op.lastbalance}</td>
                          <td>{op.admin}</td>
                          <td>{op.date}</td>

                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const renderActions = () => {
    return (
      <div>
        <button onClick={() => history.goBack()} className='border rounded py-2 px-3 mx-2'>iptal</button>
      </div>
    )
  }
  if (loading && !user) return (
    <div className="d-flex justify-content-center">
    <Loading />
    </div>
  )
  return (
    <Modal
      title="Kullanıcı Detayları"
      onDismiss={() => history.goBack()}
      actions={renderActions()}
      content={renderContent()}
    />
  )
}

export default UsersDetail