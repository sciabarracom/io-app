/**
 * A component to render a list of services organized in sections, one for each organization.
 */
import I18n from "i18n-js";
import { Button, Text, View } from "native-base";
import React from "react";
import { Image, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { StyleSheet } from "react-native";
import { ServicePublic } from "../../../definitions/backend/ServicePublic";
import { ServicesSectionState } from "../../store/reducers/entities/services";
import { ReadStateByServicesId } from "../../store/reducers/entities/services/readStateByServiceId";
import { ProfileState } from "../../store/reducers/profile";
import customVariables from "../../theme/variables";
import IconFont from "../ui/IconFont";
import ServiceList from "./ServiceList";

type AnimatedProps = {
  animated?: {
    onScroll: (_: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollEventThrottle?: number;
  };
};

type OwnProps = {
  sections: ReadonlyArray<ServicesSectionState>;
  profile: ProfileState;
  onChooserAreasOfInterestPress?: () => void;
  selectedOrganizationsFiscalCodes?: Set<string>;
  isLocal?: boolean;
  onLongPressItem?: () => void;
  isLongPressEnabled: boolean;
  onItemSwitchValueChanged?: (service: ServicePublic, value: boolean) => void;
  renderRightIcon?: (section: ServicesSectionState) => React.ReactNode;
  isRefreshing: boolean;
  onRefresh: () => void;
  onSelect: (service: ServicePublic) => void;
  readServices: ReadStateByServicesId;
};

type Props = AnimatedProps & OwnProps;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1
  },
  headerContentWrapper: {
    padding: customVariables.contentPadding,
    alignItems: "center"
  },
  message: {
    fontSize: customVariables.fontSizeBase,
    textAlign: "left"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0
  },
  textButton: {
    paddingLeft: 0,
    paddingRight: 0
  },
  icon: {
    color: customVariables.brandPrimaryInverted,
    lineHeight: 24
  },
  emptyListContentTitle: {
    paddingTop: customVariables.contentPadding,
    textAlign: "center"
  }
});

class ServicesSectionsList extends React.PureComponent<Props> {
  private localListEmptyComponent() {
    return (
      this.props.isLocal && (
        <View style={styles.headerContentWrapper}>
          <Text style={styles.message}>
            {I18n.t("services.areasOfInterest.selectMessage")}
          </Text>
          <View spacer={true} large={true} />
          <Button
            small={true}
            primary={true}
            style={styles.button}
            block={true}
            onPress={this.props.onChooserAreasOfInterestPress}
          >
            <IconFont name="io-plus" style={styles.icon} />
            <Text style={styles.textButton}>
              {I18n.t("services.areasOfInterest.addButton")}
            </Text>
          </Button>
          <View spacer={true} extralarge={true} />
          <Image source={require("../../../img/services/icon-places.png")} />
        </View>
      )
    );
  }

  // component used when the list is empty
  private emptyListComponent() {
    return (
      <View style={styles.headerContentWrapper}>
        <View spacer={true} large={true} />
        <Image
          source={require("../../../img/services/icon-loading-services.png")}
        />
        <Text style={styles.emptyListContentTitle}>
          {I18n.t("services.emptyListMessage")}
        </Text>
      </View>
    );
  }

  private renderEditButton = () => {
    return (
      this.props.isLocal &&
      this.props.selectedOrganizationsFiscalCodes &&
      this.props.selectedOrganizationsFiscalCodes.size > 0 && (
        <View style={styles.headerContentWrapper}>
          <Button
            small={true}
            primary={!this.props.isLongPressEnabled}
            style={styles.button}
            block={true}
            onPress={this.props.onChooserAreasOfInterestPress}
            disabled={this.props.isRefreshing || this.props.isLongPressEnabled}
          >
            <Text style={styles.textButton}>
              {I18n.t("services.areasOfInterest.editButton")}
            </Text>
          </Button>
        </View>
      )
    );
  };

  private renderList = () => {
    // empty component is different from local and others (national and all)
    const emptyComponent = this.props.isLocal
      ? this.localListEmptyComponent()
      : this.emptyListComponent();
    return (
      <ServiceList
        animated={this.props.animated}
        sections={this.props.sections}
        profile={this.props.profile}
        isRefreshing={this.props.isRefreshing}
        onRefresh={this.props.onRefresh}
        onSelect={this.props.onSelect}
        readServices={this.props.readServices}
        ListEmptyComponent={emptyComponent}
        onLongPressItem={this.props.onLongPressItem}
        isLongPressEnabled={this.props.isLongPressEnabled}
        onItemSwitchValueChanged={this.props.onItemSwitchValueChanged}
        renderRightIcon={this.props.renderRightIcon}
      />
    );
  };

  public render() {
    return (
      <View style={styles.contentWrapper}>
        {this.renderEditButton()}
        {this.renderList()}
      </View>
    );
  }
}

export default ServicesSectionsList;
