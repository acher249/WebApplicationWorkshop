<template>
<div class="card">
  <div class="card-body">
    <h4 class="card-title">Saved Slices</h4>
    <h6 class="card-subtitle text-muted">Saved slices from database</h6>
    <table class="table table-sm mt-2" v-if="sliceAreaFloors.length">
      <tr>
        <th>Filename</th>
        <th>Sum of Areas</th>
        <th colspan="2">Elevations</th>
      </tr>
      <tr v-for="(slice, i) in sliceAreaFloors">
        <td>{{slice.name}}</td>
        <td>{{slice.areas}}</td>
        <td>{{slice.floors}}</td>
        <td><button class="btn btn-sm btn-primary mr-1" v-on:click="selectSlice(i)">Select</button><button class="btn btn-sm btn-danger" v-on:click="deleteSlice(i)">Delete</button></td>
      </tr>
    </table>
    <span v-else class="text-info mt-2">No slices saved, try uploading geometry and entering some elevations!</span>
  </div>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      slices: null
    }
  },
  computed: {
    sliceAreaFloors: function() {
      const component = this;
      const sliceAreaFloors = [];
      component.slices && component.slices.forEach((each) => {
        const name = each.model && each.model.name;
        let areas = each.slices && each.slices.areas && each.slices.areas.reduce((sum, area) => {
          return sum += area;
        }, 0);
        areas = Math.round(areas * 10) / 10;
        const floors = each.slices && each.slices.floors && each.slices.floors.map((floor) => {
          return +floor;
        });
        sliceAreaFloors.push({
          name,
          areas,
          floors
        });
      });
      return sliceAreaFloors;
    }
  },
  methods: {
    selectSlice(index) {
      const component = this;
      console.log("select i: ", index);
      component.$emit("selectedSlice", component.slices[index]);
    },
    deleteSlice(index) {
      const component = this;
      const data = {
        _id: component.slices[index]._id
      };
      $.ajax({
        url: '/api/delete-slice',
        data: JSON.stringify(data),
        cache: false,
        contentType: "application/json",
        processData: false,
        method: 'DELETE',
        success: (response) => {
          if (response === true) {
            component.slices.splice(index, 1);
          }
        }
      });
    }
  },
  created() {
    const component = this;
    $.get("/api/retrieve-slices").then((data) => {
      component.slices = data;
      console.log("retrieved slices: ", component.slices);
    });
  }
}
</script>
