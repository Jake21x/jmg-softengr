import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { WorkersService } from "../providers/workers.service";
import { WorkersItem } from "../types/workers";
import { AxiosResponse } from "axios";
import { dummyArrp } from "../utils/dummy";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  today = new Date();

  isLoading = true;

  workersCollection: WorkersItem[] = dummyArrp;
  dataSource = new MatTableDataSource<WorkersItem>(this.workersCollection);

  sortBy = "";
  searchQuery = "";

  displayedColumns: string[] = [
    "workerid",
    "name",
    "department",
    "joining_date",
    "salary",
  ];

  constructor(private ws: WorkersService) {}

  async ngOnInit() {
    await this.ws.getWorkers().then((res) => {
      console.log("result", res.data);

      setTimeout(() => {
        this.isLoading = false;
        this.displayedColumns = [
          "workerid",
          "name",
          "department",
          "joining_date",
          "salary",
        ];

        if (res.data && res.data.length !== 0) {
          this.workersCollection = res.data.map((r) => ({
            workerid: r.worker__id,
            name: r.first_name,
            lastname: r.last_name,
            salary: r.salary,
            department: r.department,
            joining_date: r.joining_date,
          }));

          this.dataSource = new MatTableDataSource<WorkersItem>(
            this.workersCollection
          );
        } else {
          this.dataSource = new MatTableDataSource<WorkersItem>([]);
        }
      }, 50);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public deleteWorker(el) {
    // console.log("deleteWorker", el);
  }

  public checkWorker(evt) {
    console.log("checkWorker", evt);
    evt.checked = evt.checked ? false : true;
  }

  public sortAction(evt) {
    const orig = [...this.workersCollection];
    let sorted = [];

    if (this.sortBy == "asc" || this.sortBy == "") {
      this.sortBy = "desc";
      sorted = orig.sort((a, b) => {
        return (
          new Date(a.joining_date).getTime() -
          new Date(b.joining_date).getTime()
        );
      });
    } else {
      this.sortBy = "asc";
      sorted = orig.sort((a, b) => {
        return (
          new Date(b.joining_date).getTime() -
          new Date(a.joining_date).getTime()
        );
      });
    }

    this.dataSource = new MatTableDataSource<WorkersItem>(sorted);
    // console.log("sortAction", this.sortBy);
  }

  public searchTyping(evt) {
    const orig = [...this.workersCollection];
    // console.log("searchTyping", evt, orig);
    if (evt.toString().trim() == "") {
      this.dataSource = new MatTableDataSource<WorkersItem>(orig);
    } else {
      const result = orig.filter((r) => {
        return (
          r.workerid +
          " " +
          r.name +
          " " +
          r.lastname +
          " " +
          r.salary +
          " " +
          r.department +
          " " +
          r.joining_date
        )
          .toLowerCase()
          .includes(evt.toLowerCase());
      });

      this.dataSource = new MatTableDataSource<WorkersItem>(result);
      // console.log("result", result);
    }
  }
}
