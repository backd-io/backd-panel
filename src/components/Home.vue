<template>
  <div class="row">
    <div class="col-6 height-100 tablet-height-auto border">
      <div class="padding-25 text-left">
        <a href="#" class="text-26 text-orange">backd</a>
      </div>

      <div class="margin-top-15 width-60">
        <h2 class="text-orange text-center mobile">backd : Application Backend.</h2>
        <div class="button-center padding-top-20 hover-href-text-orange">
          <a class="btn l border orange mobile-full-width hover-fill-white" href="https://github.com/backd-io/backd">
            <i class="fa fa-lg fa-github">&nbsp;</i>github
          </a>
        </div>
        <div class="margin-top-15 width-70">
          <h3><a href="#" class="text-20 text-orange">http://www.backd.io/</a></h3>
        </div>
      </div>
    </div>

    <div class="col-6 height-100 padding-40 tablet-height-auto mobile-padding">

      <div class="padding-40 mobile-padding margin-top-10">
        <h3 class="text-center text-orange margin-bottom mobile">Sign in</h3>
        <h5 class="text-center text-18">
          Please use your current credentials to log in using the form below.
          <p>{{ err }}</p>
        </h5>
      </div>

      <form class="form step-form wire border orange padding-20 -padding-top mobile-padding" v-on:submit.prevent>
        <div class="group gutter-bottom-10">
          <input class="l border-silver focus-border-orange" type="text" placeholder="domain" v-model="domain">
        </div>

        <div class="group gutter-bottom-10">
          <input class="l border-silver focus-border-orange" type="text" placeholder="username" v-model="username">
        </div>

        <div class="group gutter-bottom-10">
          <input class="l border-silver focus-border-orange" type="password" placeholder="password" v-model="password">
        </div>

        <div class="group">
          <button class="btn text500 hover-fill-orange hover-text-white mobile-width-100 mobile-margin-bottom" @click="login()">sign in</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      domain: '',
      username: '',
      password: '',
      err: ''
    }
  },
  methods: {
    login () {
      var that = this
      // that.$store.state.Backd.Admin().Users().Add()
      that.$store.state.Backd.Identity().Auth().Basic(that.domain, that.username, that.password)
      .then(function () {
        that.err = 'Moo!'
        that.$store.state.Backd.Identity().Domain().List()
        .then(function (response) {
          console.log(response[0])
        })
      })
      .catch(function () {
        that.err = 'Unauthorized'
      })
    }
  }
}
</script>

<style>
  html,
  body {
    height: 100%;
    overflow-x: hidden;
  }

  .width-70 {
    width: 70%;
  }

  .margin-top-10 {
    margin-top: 10%;
  }

  .margin-top-15 {
    margin: 15% auto 5% auto;
  }

  .margin-top-15 h2,
  h5 {
    line-height: 1.5;
  }

  @media (max-width: 800px) {
    .margin-top-15,
    .margin-top-10 {
      margin: 0 auto 5% auto;
    }
  }
</style>
