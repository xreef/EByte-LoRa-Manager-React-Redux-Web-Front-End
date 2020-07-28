/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Definitions for redux-logic
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2018 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { Observable, Subject } from 'rxjs';

import { Middleware } from 'redux';

import { ArgumentAction, StandardAction } from './action';
import { Object, Override } from './utilities';
import {AxiosInstance} from "axios";
import {AppActions} from "./index";

//
// LOGIC
//

/*                     *    *    *    *                       *
 | State is the type of the state stored in redux             |
 | Payload is the type of the payload of the handled action   |
 | Meta is the type of the meta object of the handled action  |
 | Dependency is the type of depObj excluding getState/action |
 | Context is the type of the ctx object                      |
 | Type is the type of the handled action                     |
 *                     *    *    *    *                       */

export type Logic<
    RootState = {},
    Payload extends Object = undefined,
    Meta extends Object = undefined,
    Dependency extends object = {},
    Context extends Object = undefined,
    Type extends string = string
    > = Override<
    CreateLogic.Config<
        RootState,
        AppActions,
        Dependency,
        Context,
        Type
        >,
    {
        name: string;
        type: string;
        cancelType: string;
    }
    >;

/* ----- createLogic ----- */

export declare const createLogic: CreateLogic;

export interface CreateLogic {
    // full createLogic declaration
    <
        RootState,
        Payload extends Object = undefined,
        Meta extends Object = undefined,
        Dependency extends object = {},
        Context extends Object = undefined,
        Type extends string = string,
        AppActions,
        >(
        config: CreateLogic.Config<
            RootState,
            AppActions,
            Dependency,
            Context,
            Type
            >
    ): Logic<State, Payload, Meta, Dependency, Context, Type>;

    // createLogic wihout context
    <
        RootState,
        Payload extends Object = undefined,
        Meta extends Object = undefined,
        Dependency extends object = {},
        Type extends string = string,
        AppAction,
        >(
        config: CreateLogic.Config<
            State,
            AppAction,
            Dependency,
            undefined,
            Type
            >
    ): Logic<State, Payload, Meta, Dependency, undefined, Type>;

    // createLogic wihout payload and meta
    <
        RootState,
        Dependency extends object = {},
        Context extends Object = undefined,
        Type extends string = string,
        AppAction
        >(
        config: CreateLogic.Config<RootState, AppAction, Dependency, Context, Type>
    ): Logic<State, undefined, undefined, Dependency, Context, Type>;

    // createLogic with State and Type only
    <RootState, Type extends string = string, AppAction>(
        config: CreateLogic.Config<State, AppAction, {}, undefined, Type>
    ): Logic<State, undefined, undefined, {}, undefined, Type>;

    // createLogic with State, Dependency and Type only
    <
        RootState,
        Dependency extends object = {},
        Type extends string = string,
        AppAction
        >(
        config: CreateLogic.Config<RootState, AppAction, Dependency, undefined, Type>
    ): Logic<State, undefined, undefined, Dependency, undefined, Type>;
}

export namespace CreateLogic {
    export type Config<
        RootState,
        AppAction,
        Dependency extends object,
        Context extends Object,
        Type extends string
        > = Config.Base<RootState, AppAction, Type> &
        (
            | Config.Validate<RootState, AppAction, Dependency, Context>
            | Config.Transform<RootState, AppAction, Dependency, Context>) &
        (Config.Process<RootState, AppAction, Dependency, Context>);

    export namespace Config {
        /* ----- common ----- */

        export type DepObj<RootState, AppAction, Dependency> = Dependency & {
            httpClient: AxiosInstance;
            getState(): State;
            action: Action;
            action$: Observable<Action>;
        };

        export type ActionCreatorType<Action extends StandardAction> = {
            (payload: PayloadExtractor<Action>): Action;
            toString(): string;
        }

        export type PrimitiveType<Type extends string | symbol, InputPayload> =
            | Type
            | RegExp
            | Function;

        export type TypeMatcher<
            Type extends string | symbol,
            Payload extends Object
            > = PrimitiveType<Type, Payload> | PrimitiveType<Type, Payload>[];

        export type Pass<AppAction, Context extends Object> = (
            action: ArgumentAction &
                (Context extends undefined
                    ? {}
                    : (Context extends undefined ? { ctx?: Context } : { ctx: Context })),
            options?: {
                useDispatch: boolean | 'auto';
            }
        ) => void;

        export interface Base<
            RootState,
            Action extends StandardAction,
            Type extends string
            > {
            name?: string | Function;
            type: TypeMatcher<Type, PayloadExtractor<Action>> | ActionCreatorType<Action>;
            cancelType?: TypeMatcher<string, PayloadExtractor<Action>>;
            latest?: boolean;
            debounce?: number;
            throttle?: number;
            warnTimeout?: number;
        }

        // ---------------------------------------- //

        /* ----- validate ----- */

        interface Validate<
            State,
            AppAction,
            Dependency extends object,
            Context extends Object
            > {
            validate?: Validate.Hook<RootState, AppAction, Dependency, Context>;
        }

        export namespace Validate {
            export type Hook<
                State,
                AppAction,
                Dependency extends object,
                Context extends Object = undefined
                > = (
                depObj: DepObj<RootState, AppAction, Dependency>,
                allow: Pass<Action, Context>,
                reject: Pass<Action, Context>
            ) => void;
        }

        // ---------------------------------------- //

        /* ----- transform ----- */

        interface Transform<
            State,
            AppAction,
            Dependency extends object,
            Context extends Object
            > {
            transform?: Transform.Hook<RootState, AppAction, Dependency, Context>;
        }

        export namespace Transform {
            export type Hook<
                State,
                AppAction,
                Dependency extends object,
                Context extends Object = undefined
                > = (
                depObj: DepObj<RootState, AppAction, Dependency>,
                next: Pass<Action, Context>,
                reject?: Pass<Action, Context>
            ) => void;
        }

        // ---------------------------------------- //

        /* ----- process ----- */

        type ActionCreator<
            InputPayload extends Object
            > = InputPayload extends undefined
            ? (payload?: InputPayload) => StandardAction<string, any>
            : (InputPayload extends Error
                ? (error?: Error) => Action<string, any>
                : (payload?: InputPayload) => Action<string, any>);

        type PayloadExtractor<
            Action extends StandardAction
            > = Action extends StandardAction<infer Type, infer Payload>
            ? Payload
            : undefined;

        export interface Process<
            RootState,
            Action extends StandardAction<string>,
            Dependency extends object,
            Context extends Object = undefined
            > {
            processOptions?: Process.Options<Action>;
            process?: Process.Hook<RootState, AppAction, Dependency, Context>;
        }

        export namespace Process {
            export interface Options<Action extends StandardAction> {
                dispatchReturn?: boolean;
                dispatchMultiple?: boolean;
                successType?: string | ActionCreator<PayloadExtractor<Action>>;
                failType?: string | ActionCreator<Error>;
            }

            export type DepObj<
                RootState,
                Action extends StandardAction,
                Dependency extends object,
                Context extends Object = undefined
                > = Config.DepObj<RootState, AppAction, Dependency> & {
                cancelled$: Subject<void>;
                ctx: Context;
            };

            export type Hook<
                RootState,
                Action extends StandardAction,
                Dependency extends object,
                Context extends Object = undefined
                > = ((
                depObj: Process.DepObj<RootState, AppAction, Dependency, Context>,
                dispatch: (action: AppActions) => void,
                done: () => void
            ) => void);
        }

        // ---------------------------------------- //
    }
}

// ---------------------------------------- //

/* ----- configureLogic ----- */

export function configureLogic(options: { warnTimeout?: number }): void;

// ---------------------------------------- //
