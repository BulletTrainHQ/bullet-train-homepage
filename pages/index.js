import React from 'react';
import Link from 'next/link';

import Head from 'next/head';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import data from '../common/utils/_data';
import { Google } from '../project/auth';
import Delay from '../components/Delay';

const HomePage = class extends React.Component {
  static displayName = 'HomePage';

  constructor(props, context) {
      super(props, context);
      this.state = {};
  }

  componentDidMount() {
      API.trackPage(Constants.pages.HOME);
      if (Project.gaAPIKey) {
          Google.init(Project.gaAPIKey, Project.gaClientId);
      }
      this.checkSignup();
  }

  componentWillReceiveProps(nextProps, nextContext) {
      this.checkSignup();
  }

  checkSignup = () => {
      if (!this.signup) {
          const isSignup = document.location.href.includes('?signup');
          if (isSignup) {
              this.signup = true;
              setTimeout(() => {
                  Utils.scrollToSignUp();
              }, 200);
          }
      }
  };

  google = () => {
      API.trackEvent(Constants.events.REGISTER_GOOGLE);
      Google.login().then((res) => {
          if (res) {
              document.location = `https://app.flagsmith.com/oauth/google?code=${res}`;
          }
      });
  }

  register = (details) => {
      const { email, password, first_name, last_name, organisation_name = 'Default Organisation' } = details;
      this.setState({ isSaving: true });
      const referrer = API.getReferrer();
      let query = '';
      if (referrer) {
          query = `${Utils.toParam(Utils.fromParam())}`;
      }

      data.post(`${Project.api}auth/users/`, {
          email,
          password,
          first_name,
          last_name,
          query,
      })
          .then((res) => {
              API.setEvent(JSON.stringify({ tag: 'registrations', event: `User register${email} ${first_name} ${last_name}` }));
              API.trackEvent(Constants.events.REGISTER);
              API.setStoredToken(res.key);
              document.location = Project.appUrl + query;
          })
          .catch((error) => {
              this.setState({ error, isSaving: false });
          });
  };

  render = () => {
      const { email, password, organisation_name, first_name, last_name, error, isLoading, isSaving } = this.state;
      const redirect = ''; // todo: fixme
      return (
          <div className="homepage">

              <Head>
                  <title>
            Feature Flags and Toggles for Continuous Integration - Flagsmith
                  </title>
                  <link rel="canonical" href="https://flagsmith.com/"/>
              </Head>
              <Hero redirect={redirect}/>
              <div className="feature-container ">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-4">
                              <h2>Manage features without deployments</h2>
                              <p>
                  Flagsmith combines the concepts of feature toggles with the flexibility of remote config. Rather
                  than just switching features on and off, you can configure them for individual segments, users and
                  development environments.
                              </p>
                          </div>
                          <div className="col-md-8 text-right">
                              <Delay>
                                  <img
                                    style={{ maxWidth: '100%' }} alt="Feature use cases"
                                    srcSet="/static/images/homepage-features-1x.png 1x, /static/images/homepage-features-2x.png 2x"
                                    src="/static/images/homepage-features-1x.png"
                                  />
                              </Delay>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="feature-container alt">
                  <div className="container">
                      <div className="flex-row">
                          <div className="col-md-8">
                              <div className="text-left">
                                  <Delay>
                                      <img
                                        style={{ maxWidth: '100%' }} alt="User segmentation and ab testing"
                                        srcSet="/static/images/homepage-segments-1x.png 1x, /static/images/homepage-segments-2x.png 2x"
                                        src="/static/images/homepage-segments-1x.png"
                                      />
                                  </Delay>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <h2>Powerful user segmentation</h2>
                              <p>
                  Utilise our powerful rules engine to manage your features for the users you wish to target. You can
                  even use segments for <strong>staged rollouts</strong> or <strong>a/b testing</strong>.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="feature-container">
                  <div className="text-center tech margin-auto col-md-12 text-center">
                      <h2>We currently support these popular languages</h2>
                      <div style={{ justifyContent: 'center' }} className="row">
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/java/">
                                  <img src="/static/images/tech-logos/java.png" alt="Java" title="Java"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/javascript/">
                                  <img
                                    src="/static/images/tech-logos/javascript.png" alt="JavaScript"
                                    title="JavaScript Feature Flags"
                                  />
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/javascript/">
                                  <img src="/static/images/tech-logos/react.png" alt="React JS" title="React JS Feature Flags"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/node/">
                                  <img src="/static/images/tech-logos/node.png" alt="Node.js" title="Node.js Feature Flags"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/python/">
                                  <img
                                    src="/static/images/tech-logos/python.png" alt="Python Feature Flags"
                                    title="Python"
                                  />
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/ruby/">
                                  <img src="/static/images/tech-logos/ruby.png" alt="Ruby" title="Ruby Feature Flags"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/dotnet/">
                                  <img src="/static/images/tech-logos/dotnet.png" alt=".NET" title=".NET Feature Flags"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/java/">
                                  <img src="/static/images/tech-logos/android2x.png" alt="android" title="android Feature Flags"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/ios/">
                                  <img src="/static/images/tech-logos/bt-IOS.png" alt="iOS" title="iOS Feature Flags"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/flutter/">
                                  <img src="/static/images/tech-logos/flutter.png" alt="Flutter" title="Flutter Feature Flags"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/php/">
                                  <img src="/static/images/tech-logos/php.png" alt="PHP" title="PHP Feature Flags"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/go/">
                                  <img src="/static/images/tech-logos/golang.png" alt="Go" title="Go Feature Flags"/>
                              </a>
                          </div>
                          <div className="col">
                              <a href="https://docs.flagsmith.com/clients/rust/">
                                  <img src="/static/images/tech-logos/rust.png" alt="Rust" title="Rust Feature Flags"/>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="feature-container">
                  <div className="section--wave">
                      <div className="offset-md-3 col-md-6">
                          <h2 className="text-center section--wave__title">How can Flagsmith accelerate your development process? Here's how.</h2>
                      </div>
                  </div>
                  <div className="section--grey">
                      <div className="container">
                          <div className="flex-row mt-5 mb-5">
                              <div className="col-md-5">
                                  <h3>1. Start on a new Feature
                                      Branch
                                  </h3>
                                  <p>
                                    Create a feature branch in git and a corresponding Feature Flag in Flagsmith.
                                  </p>
                              </div>
                              <div className="col-md-6 offset-md-1">
                                  <img
                                    alt="Create a new Feature"
                                    srcSet="/static/images/workflow/workflow-1.png 1x, /static/images/workflow/workflow-1@2x.png 2x, /static/images/workflow/workflow-1@3x.png 3x"
                                    src="/static/images/workflow/workflow-1.png"
                                    className="img-fluid"
                                  />
                              </div>
                          </div>

                          <div className="flex-row mt-5 mb-5">
                              <div className="col-md-6">
                                  <div
                                    style={{pointerEvents:"none",userSelect:"none"}}
                                    dangerouslySetInnerHTML={{ __html: `
                                  
                                  <code contentEditable="false" className="javascript hljs"><span
                                  className="hljs-keyword">import</span> <span class="hlhs-brand">flagsmith</span> <span className="hljs-keyword">from</span> <span class="hljs-string">"flagsmith"</span>;
                                  <br/>
                                  <br/>
                                    <span class="hlhs-brand">flagsmith</span>.<span class="hljs-keyword">identify</span>(<span class="hljs-string">"user_id"</span>, user.id);
                                    <br/>
                                    <span class="hlhs-brand">flagsmith</span>.<span class="hljs-keyword">setTrait</span>(<span class="hljs-string">"email_address"</span>, user.emailAddress);
                                    <br/>
                                    <br/>
                                   <span class="hljs-keyword">if</span> (<span class="hlhs-brand">flagsmith</span>.<span class="hljs-keyword">hasFeature</span>(<span class="hljs-string">"customer_chat_widget"</span>)) {
                                    <span class="ml-2"/> <span class="hljs-keyword-2">displayChatWidget</span>();<br/>
                                  }
                                </code>
                                  ` }} className="code-img"
                                  />
                              </div>
                              <div className="col-md-5 offset-md-1">
                                  <h3>2. Deploy the feature behind the feature flag
                                  </h3>
                                  <p>Write your code, place it behind a feature flag and deploy it straight to production. Don't worry! It's hidden for everyone.
                                  </p>
                              </div>
                          </div>

                          <div className="flex-row mt-5 mb-5">
                              <div className="col-md-5">
                                  <h3><span className="text--green">3.</span> Enable the feature for your own account
                                  </h3>
                                  <p>You can now test the widget using your own account. Select your own user within Flagsmith and override the flag for your account.
                                  </p>
                                  <p>The widget will now show up for your own account. It's still hidden for everybody else.</p>
                              </div>
                              <div className="col-md-7">
                                  <img
                                    alt="Enable the feature"
                                    srcSet="/static/images/workflow/workflow-3.png 1x, /static/images/workflow/workflow-3@2x.png 2x, /static/images/workflow/workflow-3@3x.png 3x"
                                    src="/static/images/workflow/workflow-3.png"
                                    className="img-fluid"
                                  />
                              </div>
                          </div>

                          <div className="flex-row mt-5 mb-5">
                              <div className="col-md-5">
                                  <img
                                    alt="Create a new Feature"
                                    srcSet="/static/images/workflow/workflow-4.2.png 1x, /static/images/workflow/workflow-4.2@2x.png 2x, /static/images/workflow/workflow-4.2@3x.png 3x"
                                    src="/static/images/workflow/workflow-4.2.png"
                                    className="img-fluid"
                                  />
                              </div>
                              <div className="col-md-6 offset-md-1">
                                  <h3>4. Bring in the rest of your team</h3>
                                  <p>Create a Segment that includes all your company team members.</p>
                                  <p>Now we can override that flag for this segment of users. They can now test out the new widget and make sure all the integration points work nicely.</p>
                                  <img
                                    alt="Bring in the rest of your team"
                                    srcSet="/static/images/workflow/workflow-4.1.png 1x, /static/images/workflow/workflow-4.1@2x.png 2x, /static/images/workflow/workflow-4.1@3x.png 3x"
                                    src="/static/images/workflow/workflow-4.1.png"
                                    className="img-fluid mt-5 mb-5 mb-sm-0"
                                  />
                              </div>
                          </div>

                          <div className="flex-row mt-5 mb-5">
                              <div className="col-md-5">
                                  <h3>5. Gradually release the feature!</h3>
                                  <p>Lets do a percentage rollout so that we can be sure that there are no unexpected issues when deploying the feature to everyone.</p>

                                  <p>Modify the Segment, replacing the emailAddress filter with a % Split. 5% of our users will now see the chat widget and 95% won't.</p>
                              </div>
                              <div className="col-md-6 offset-md-1">
                                  <img
                                    alt="Enable the feature"
                                    srcSet="/static/images/workflow/workflow-5.png 1x, /static/images/workflow/workflow-5@2x.png 2x, /static/images/workflow/workflow-5@3x.png 3x"
                                    src="/static/images/workflow/workflow-5.png"
                                    className="img-fluid"
                                  />
                              </div>
                          </div>

                          <div className="mt-5 mb-5 pb-5">
                              <div className="offset-md-3 col-md-6">
                                  <h3 className="text-center">
                                      6. Finish Up
                                  </h3>
                                  <p className="text-center">The chat widget has been live for a few weeks, and
                                      everything is working nicely. The team have decided that they want to keep the
                                      widget in the application, so we can now remove the feature flag entirely. We edit
                                      the code to remove the optional display of the widget, and delete the flag from
                                      Flagsmith.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="feature-container">
                  <div className="text-center text-center col-xl-4 offset-lg-4">
                      <h2>Fully Featured Platform</h2>
                  </div>
                  <div className="container">
                      <div className="mt-5 row">
                          <div className="col-xl-4 col-md-6 text-center">
                              <div className="card mb-3 card--feature">
                                  <span className="card__icon ion-ios-switch mb-3"/>
                                  <h5 className="card__title">Feature Flag Management</h5>
                                  <p className="card__paragraph-text">
                    Ship features remotely across
                    multiple environments. Deliver true Continuous Integration.
                                  </p>
                                  <a
                                    className="card__link"
                                    href="https://docs.flagsmith.com/managing-features/"
                                  >
                    Feature flags
                                      <span
                                        className="pl-2 ion-md-arrow-dropright"
                                      />
                                  </a>
                              </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                              <div className="card mb-3 card--feature">
                                  <span className="card__icon ion-ios-options mb-3"/>
                                  <h5 className="card__title">Customise Features</h5>
                                  <p className="card__paragraph-text">
                                      {' '}
                    Change the behaviour,
                    appearance and configuration of your app without needing to
                    deploy.
                                  </p>
                                  <a
                                    className="card__link"
                                    href="https://docs.flagsmith.com/managing-features/"
                                  >
                    Remote config
                                      <span
                                        className="pl-2 ion-md-arrow-dropright"
                                      />
                                  </a>
                              </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                              <div className="card mb-3 card--feature">
                                  <span className="card__icon ion-ios-person mb-3"/>
                                  <h5 className="card__title">User Traits</h5>
                                  <p className="card__paragraph-text">
                    Store traits against your users
                    without modifying your back-end and target features specifically for them.
                                  </p>
                                  <a
                                    className="card__link"
                                    href="https://docs.flagsmith.com/managing-identities/#identity-traits"
                                  >
                    User Traits
                                      <span
                                        className="pl-2 ion-md-arrow-dropright"
                                      />
                                  </a>
                              </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                              <div className="card mb-3 card--feature">
                                  <span className="card__icon ion-md-contacts mb-3"/>
                                  <h5 className="card__title">Create User Segments</h5>
                                  <p className="card__paragraph-text">
                    Create detailed user segments
                    based on their traits, then target features based on the segment.
                                  </p>
                                  <a
                                    className="card__link"
                                    href="https://docs.flagsmith.com/managing-segments/"
                                  >
                    User Segments
                                      <span
                                        className="pl-2 ion-md-arrow-dropright"
                                      />
                                  </a>
                              </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                              <div className="card mb-3 card--feature">
                                  <span className="card__icon ion-ios-browsers mb-3"/>
                                  <h5 className="card__title">Staged Feature Rollouts</h5>
                                  <p className="card__paragraph-text">
                    Deploy features to 1% of your user base.
                    All good? Roll out to everybody.
                                  </p>
                                  <a
                                    className="card__link"
                                    href="https://docs.flagsmith.com/staged-feature-rollouts/"
                                  >
                    Staged Feature Rollouts
                                      <span
                                        className="pl-2 ion-md-arrow-dropright"
                                      />
                                  </a>
                              </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                              <div className="card mb-3 card--feature">
                                  <span className="card__icon ion-md-done-all mb-3"/>
                                  <h5 className="card__title">Track Changes</h5>
                                  <p className="card__paragraph-text">
                    Audit changes &amp;
                    rollback any mistakes or issues.
                                  </p>
                                  <a
                                    className="card__link"
                                    href="https://docs.flagsmith.com/audit-logs/"
                                  >
                    Track Changes
                                      <span
                                        className="pl-2 ion-md-arrow-dropright"
                                      />
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="sign-up" id="sign-up">
                  <div>
                      <div className="card signup-form container animated fadeIn col-md-8 col-xl-8">
                          <form
                            id="form" name="form" onSubmit={(e) => {
                                Utils.preventDefault(e);
                                this.register({ email, password, organisation_name, first_name, last_name });
                            }}
                          >
                              <div className="form-intro text-center">
                                  <h3>It's free to get started.</h3>
                                  <p>
                    We have a 100% free for life plan for smaller projects.
                                      {' '}
                                      <Link href="/pricing">
                                          <a>
                        Check out our Pricing.
                                          </a>
                                      </Link>
                                  </p>
                              </div>

                              {(!!Project.gaAPIKey || !!Project.githubKey) && (
                              <>
                                  {Project.gaAPIKey && (
                                  <Row style={{ justifyContent: 'center' }}>
                                      <button
                                        type="button" key="google" className="btn btn__oauth btn__oauth--google"
                                        onClick={this.google}
                                      >
                                          <img src="/static/images/oauth/google.svg"/> Sign up with Google
                                      </button>
                                  </Row>
                                  )}
                                  {Project.githubKey && (
                                  <Row style={{ justifyContent: 'center' }}>
                                      <a
                                        href={Project.githubKey}
                                        key="google" className="btn btn__oauth btn__oauth--github"
                                      >
                                          <img src="/static/images/oauth/github.svg"/> Sign up with GitHub
                                      </a>
                                  </Row>
                                  )
                                }
                                  <Row style={{ justifyContent: 'center' }}>
                                      <h4>
                                    Or
                                      </h4>
                                  </Row>
                              </>
                              )}


                              <fieldset id="details" className="col-lg-6 offset-lg-3">
                                  <InputGroup
                                    title="First Name"
                                    data-test="firstName"
                                    inputProps={{
                                        name: 'firstName',
                                        className: 'full-width',
                                        error: error && error.first_name,
                                    }}
                                    onChange={(e) => {
                                        this.setState({ first_name: Utils.safeParseEventValue(e) });
                                    }}
                                    className="input-default full-width"
                                    type="text"
                                    name="firstName" id="firstName"
                                  />
                                  <InputGroup
                                    title="Last Name"
                                    data-test="lastName"
                                    inputProps={{
                                        name: 'lastName',
                                        className: 'full-width',
                                        error: error && error.last_name,
                                    }}
                                    onChange={(e) => {
                                        this.setState({ last_name: Utils.safeParseEventValue(e) });
                                    }}
                                    className="input-default full-width"
                                    type="text"
                                    name="lastName" id="lastName"
                                  />
                                  <InputGroup
                                    title="Email address"
                                    data-test="email"
                                    inputProps={{
                                        name: 'email',
                                        className: 'full-width',
                                        error: error && error.email,
                                    }}
                                    onChange={(e) => {
                                        this.setState({ email: Utils.safeParseEventValue(e) });
                                    }}
                                    className="input-default full-width"
                                    type="text"
                                    name="email"
                                    id="email"
                                  />
                                  <InputGroup
                                    title="Password"
                                    data-test="password"
                                    inputProps={{
                                        name: 'password',
                                        className: 'full-width',
                                        error: error && error.password1,
                                    }}
                                    onChange={(e) => {
                                        this.setState({ password: Utils.safeParseEventValue(e) });
                                    }}
                                    className="input-default full-width"
                                    type="password"
                                    name="password"
                                    id="password"
                                  />

                                  {error
                  && (
                  <FormGroup>
                      <div id="error-alert" className="alert alert-danger">
                        Please check your details and try again
                      </div>
                  </FormGroup>
                  )
                  }

                                  <div className="form-cta margin-top">

                                      <Button
                                        data-test="signup-btn"
                                        name="signup-btn"
                                        disabled={isLoading || isSaving}
                                        className="full-width mb-3"
                                        type="submit"
                                      >
                      Get Started For Free
                                      </Button>
                                      <a href={`${Project.appUrl}/login`} id="existing-member-btn">
                      Already a member?
                                      </a>
                                  </div>
                              </fieldset>
                          </form>
                      </div>
                  </div>
              </div>

              <Footer className="homepage"/>
          </div>
      );
  };
};

export default HomePage;
