import { StrategyVerifyCallback } from 'remix-auth'
import type { OAuth2StrategyVerifyParams } from 'remix-auth-oauth2'
import { OAuth2Strategy } from 'remix-auth-oauth2'

/**
 * This interface declares what configuration the strategy needs from the
 * developer to correctly work.
 */
export interface LichessStrategyOptions {
  clientID: string
  callbackURL: string
}

/**
 * This interface declares what the developer will receive from the strategy
 * to verify the user identity in their system.
 */
export interface LichessProfile {
  provider: 'lichess'
  id: string
  username: string
  displayName: string
  profileUrl: string
}

export class LichessStrategy<User> extends OAuth2Strategy<
  User,
  LichessProfile
> {
  name = 'lichess'
  private userInfoURL: string

  constructor(
    options: LichessStrategyOptions,
    verify: StrategyVerifyCallback<
      User,
      OAuth2StrategyVerifyParams<LichessProfile>
    >
  ) {
    super(
      {
        ...options,
        clientSecret: '',
        authorizationURL: 'https://lichess.org/oauth',
        tokenURL: 'https://lichess.org/api/token',
      },
      verify
    )
    this.userInfoURL = 'https://lichess.org/api/account'
    this.scope = 'lichess profile'
  }

  protected async userProfile(accessToken: string): Promise<LichessProfile> {
    const response = await fetch(this.userInfoURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const profile = await response.json()
    profile.provier = 'lichess'
    return profile
  }
}
